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
      console.error('Error connecting to the database:', authenticate)

      return Promise.reject(e)
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

  async addModel ({ Model, defs, opts, }) {
    await this.connect()

    defs = objectMap(defs, (v, k) => {
      const uidDefaultVersion = parseInt(process.env.Atlas.ORM_UID_DEFAULT_VERSION)

      if (v.type !== DataTypes.UUID || [ 1, 4, ].indexOf(uidDefaultVersion) === -1) return v

      return { ...v, defaultValue: Sequelize['UUIDV' + uidDefaultVersion], }
    })

    return Model.init(defs || {}, { ...(opts || {}), sequelize: sequelize, })
  }

  async importModels () {
    const models = await readdir(this.modelsDir)
    let promises = []

    models.map(modelName => {
      const modelAddrs = pathJoin(this.modelsDir, modelName)

      promises.push(require(modelAddrs)({ ORM: this, DataTypes, Model, Sequelize, sequelize }))
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