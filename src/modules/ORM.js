const { Sequelize, DataTypes, Op, } = require('sequelize')

let sequelize

//TODO: Validações no ORM - https://trello.com/c/k2vo9AWU/32-valida%C3%A7%C3%B5es-no-orm
//TODO: Migrações - https://trello.com/c/pF6LJKPU/21-migra%C3%A7%C3%B5es
//TODO: Transições - https://trello.com/c/J2l5Tvrj/22-transições
//TODO: Login com redes sociais - https://trello.com/c/TM9vRY23/29-login-com-redes-sociais
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

    Model.mixin = objs => {
      objectMap(objs, (obj, mixinName) => {
        objectMap(obj, (v, k) => {
          k = !Model[k] ? k : `${k}_${mixinName}`

          Model[k] = v
        })

        Model.router = Model.router || (() => {})

        Model.router({
          express: require('./Server').express(),
          entity: name,
          models: this.listModels(),
        })
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