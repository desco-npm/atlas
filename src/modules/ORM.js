const { Sequelize, DataTypes, Model, Op, } = require('sequelize')

let sequelize

class ORM {
  constructor () {
    this.modelsDir = pathJoin(projectDir, 'models')
    this.Op = Op
  }

  async init () {
    await this.connect()
    await this.importModels()
    await this.sync()

    return Promise.resolve()
  }

  async connect () {
    if (await this.authenticate() === true) return this

    sequelize = new Sequelize('diasrafael', 'root', '12345678', {
      host: 'localhost',
      dialect: 'mysql',
      pool: {
        max: parseInt(process.env.Atlas.ORM_POOL_MAX),
        min: parseInt(process.env.Atlas.ORM_POOL_MIN),
        acquire: parseInt(process.env.Atlas.ORM_POOL_IDLE),
        idle: parseInt(process.env.Atlas.ORM_POOL_ACQUIRE),
      }
    })

    const authenticate = await this.authenticate() === true

    if (authenticate) {
      console.log('Connected database')

      return Promise.resolve(this)
    }
    else {
      console.error('Error connecting to the database')

      process.exit()
    }
  }

  async authenticate () {
    try {
      await sequelize.authenticate()

      return true
    }
    catch (e) {
      return e
    }
  }

  async addModel ({ defs, opts, }) {
    // Duas próximas precisam estar antes do await
    // Two next ones need to be before await
    const trace = stackTrace.get();
    const name = trace[1].getFileName().split('\\').pop().slice(0, -3)

    await this.connect()

    defs = objectMap(defs, (v, k) => {
      const uidDefaultVersion = parseInt(process.env.Atlas.ORM_UID_DEFAULT_VERSION)
      
      if (v.type !== DataTypes.UUID || [ 1, 4, ].indexOf(uidDefaultVersion) === -1) return v
      
      return { ...v, defaultValue: Sequelize['UUIDV' + uidDefaultVersion], }
    })
    
    const Model = await sequelize.define(
      name,
      defs || {},
      { ...(opts || {}), sequelize: sequelize, }
    )

    Model.select = async req => {
      const params = {
        order: !req.query.order
          ? [ [ 'createdAt', 'DESC', ], ]
          : req.query.order.split(';').map(i => i.split(':')),
        offset: req.query.offset ? parseInt(req.query.offset) : undefined,
        limit: req.query.limit ? parseInt(req.query.limit) : undefined,
        where: req.query.where ? this.treatWhere(req.query.where) : {}
      }

      if (req.query.page) {
        const perPage = req.query.perPage || process.env.Atlas.ORM_PER_PAGE
        const init = (req.query.page - 1) * perPage

        params.limit = parseInt(perPage)
        params.offset = parseInt(init)
      }

      return await Model.findAndCountAll(params)
    }

    Model.insert = async req => {
      return await Model.create(req.body)
    }

    Model.read = async req => {
      return await Model.findByPk(req.params.id)
    }

    Model.update = async req => {
      return Model.update(req.body, { where: { id: req.params.id }}).then(async () => {
        return await Model.findByPk(req.params.id)
      })
    }

    Model.delete = async req => {
      const ids = { [ Op.in ]: req.params.id.split(';'), }

      return { count: await Model.destroy({ where: { id: ids, }}), }
    }

    //TODO: Tratar mixins em conflito - https://trello.com/c/YKfmGUaq/25-tratar-mixins-em-conflito
    //TODO: Vários Mixins de uma vez - https://trello.com/c/CEhVWvk2/26-v%C3%A1rios-mixins-de-uma-vez
    Model.mixin = obj => {
      objectMap(obj, (v, k) => {
        Model[k] = v
      })

      Model.router = Model.router || (() => {})

      Model.router({
        express: require('./Server').express(),
        entity: name,
        models: this.listModels(),
      })

      return Model
    }

    return Model
  }

  async importModels () {
    const models = await readdir(this.modelsDir)
    let promises = []

    models.map(modelName => {
      const modelAddrs = pathJoin(this.modelsDir, modelName)

      promises.push(require(modelAddrs)({ DataTypes, Orm: this, }))
    })

    return Promise.all(promises)
  }

  sync () {
    if (!process.env.Atlas.ORM_SYNC) return

    return sequelize.sync({
      force: process.env.Atlas.ORM_SYNC_FORCE,
      alter: process.env.Atlas.ORM_SYNC_ALTER,
    })
  }

  transaction () {
    return sequelize.transaction()
  }

  listModels () {
    return sequelize.models
  }

  treatWhere (where) {
    if (!where) return {}

    const newWhere = {}

    if (typeof where === 'string') {
      where = JSON.parse(where)
    }

    objectMap(where, (v, k) => {
      if (k.indexOf('Op.') === 0) {
        const op = k.split('.')[1]

        k = Op[op]
      }

      if (typeof v === 'object') {
        v = this.treatWhere(v)
      }

      newWhere[k] = v
    })

    return newWhere
  }
}

module.exports = new ORM()