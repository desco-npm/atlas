const { Sequelize, DataTypes, Op, } = require('sequelize')

let sequelize

//TODO: Relacionamento em User e UserGroup - https://trello.com/c/ywS5WDx3/40-relacionamento-em-user-e-usergroup
//TODO: Migrações - https://trello.com/c/pF6LJKPU/21-migra%C3%A7%C3%B5es
//TODO: Transições - https://trello.com/c/J2l5Tvrj/22-transições
class ORM {
  constructor () {
    this.modelsDir = pathJoin(projectDir, 'models')
    this.pos = {}
  }

  async init () {
    await this.connect()
    await this.importModels()
    await this.posDefines()

    return Promise.resolve()
  }

  async start () {
    await this.sync()

    return Promise.resolve()
  }

  sequelize () {
    return sequelize
  }

  async connect () {
    if (await this.authenticate() === true) return this

    sequelize = new Sequelize(
      process.env.Atlas.ORM_DB_NAME,
      process.env.Atlas.ORM_DB_USER,
      process.env.Atlas.ORM_DB_PASSWORD,
      {
        logging: process.env.Atlas.ORM_DB_LOG,
        host: process.env.Atlas.ORM_DB_HOST,
        dialect: process.env.Atlas.ORM_DB_TYPE,
        pool: {
          max: parseInt(process.env.Atlas.ORM_POOL_MAX),
          min: parseInt(process.env.Atlas.ORM_POOL_MIN),
          acquire: parseInt(process.env.Atlas.ORM_POOL_IDLE),
          idle: parseInt(process.env.Atlas.ORM_POOL_ACQUIRE),
        },
      }
    )

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

  posDefines () {
    objectMap(this.pos, (pos, modelName) => {
      const models = this.listModels()

      pos({ models, Model: models[modelName], })

    })
  }

  async addModel ({ name, defs = {}, opts = {}, mixins = {}, pos = () => {}, }) {
    // Duas próximas precisam estar antes do await
    // Two next ones need to be before await
    const trace = stackTrace.get()

    name = name || trace[1].getFileName().split('\\').pop().slice(0, -3)

    this.pos[name] = pos

    defs = objectMap(defs, (v, k) => {
      const uidDefaultVersion = parseInt(process.env.Atlas.ORM_UID_DEFAULT_VERSION)

      const versions = [ 1, 4, ]

      if (k === 'id' && (v.type !== DataTypes.UUID || versions.indexOf(uidDefaultVersion) >= 0)) {
        return { ...v, defaultValue: Sequelize['UUIDV' + uidDefaultVersion], }
      }

      return v
    })

    const Model = await sequelize.define(
      name,
      defs || {},
      { ...(opts || {}), sequelize: sequelize, }
    )

    this.mixins({ Model, mixins, })

    return Model
  }

  mixins ({ Model, mixins = {}, }) {
    mixins.CRUD = require('./mixin/CRUD')

    objectMap(mixins, (mixin, mixinName) => {
      const models = this.listModels()

      mixin = typeof mixin === 'function' ? mixin({ Model, models, Op, }) : mixin

      objectMap(mixin, (v, k) => {
        k = !Model[k] ? k : `${k}_${mixinName}`

        Model[k] = v
      })
    })

    return Model
  }

  async importModels () {
    let promises = []

    const models = (await readdir(this.modelsDir)).map(i => i.slice(0, -3))

    models.map(modelName => {
      const modelAddrs = pathJoin(this.modelsDir, modelName)

      promises.push(require(modelAddrs)({ DataTypes, Orm: this, }))
    })

    return Promise.all(promises)
  }

  sync () {
    const sync = process.env.Atlas.ORM_SYNC
    const forceSync = process.env.Atlas.ORM_SYNC_FORCE
    const alterSync = process.env.Atlas.ORM_SYNC_ALTER

    if (!sync && !forceSync && !alterSync) return

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