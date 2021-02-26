const isArray = require('is-array')
const isObject = require('is-object')
const { Sequelize, DataTypes, Op, } = require('sequelize')

let sequelize

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

  Sequelize () {
    return sequelize
  }

  DataTypes () {
    return DataTypes
  }

  Op () {
    return Op
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
        dialect: process.env.Atlas.ORM_DB_DIALOG,
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

  async addModel ({ name, attrs = {}, opts = {}, mixins = [], pos = () => {}, }) {
    // Duas próximas precisam estar antes do await
    // Two next ones need to be before await
    const trace = stackTrace.get()

    name = name || trace[1].getFileName().split('\\').pop().slice(0, -3)

    this.pos[name] = pos

    const uidDefaultVersion = parseInt(process.env.Atlas.ORM_UID_DEFAULT_VERSION)
    const uidVersions = [ 1, 4, ]

    attrs = objectMap(attrs, v => {
      const inVersions = uidVersions.indexOf(uidDefaultVersion) >= 0

      if (v.type === DataTypes.UUID && !v.defaultValue && inVersions) {
        return { ...v, defaultValue: Sequelize['UUIDV' + uidDefaultVersion], }
      }

      return v
    })

    const Model = await sequelize.define(
      name,
      attrs || {},
      { ...(opts || {}), sequelize: sequelize, }
    )

    this.mixins({ Model, mixins, })

    return Model
  }

  mixins ({ Model, mixins = [], }) {
    if (mixins.indexOf('CRUD') === -1) {
      mixins.push('CRUD')
    }

    const models = this.listModels()

    mixins.map(mixin => {
      let mixinName
      if (typeof mixin === 'string') {
        mixinName = mixin
        mixin = require('./mixin/' + mixin)
      }
      else {
        mixinName = Object.keys(mixin)[0]
        mixin = Object.values(mixin)[0]
      }

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

    const models = (await readdir(this.modelsDir))
      .map(i => i.slice(0, -3))
      .filter(i => i !== 'index.js')

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

  transaction (fn) {
    return sequelize.transaction(fn)
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

  treateInclude (include) {
    if (!include) return

    try {
      const json = JSON.parse(include)

      if (isArray(json)) {
        return json.map(i => this.treateInclude(json))
      }

      if (isObject(json) && json.model) {
        return { ...json, model: this.treateInclude(json.model), }
      }
    }
    catch {
      return this.listModels()[include]
    }
  }

  treatParameters (params) {
    params = {
      ...params,
      order: !params.order
        ? [ [ 'createdAt', 'DESC', ], ]
        : params.order.split(';').map(i => i.split(':')),
      offset: params.offset ? parseInt(params.offset) : undefined,
      limit: params.limit ? parseInt(params.limit) : undefined,
      where: this.treatWhere(params.where),
      include: this.treateInclude(params.include),
    }

    params.order = params.order.map(order => {
      if (order.length === 3) {
        order[0] = this.listModels()[order[0]]
      }

      return order
    })

    if (params.page) {
      const perPage = params.perPage || process.env.Atlas.ORM_PER_PAGE
      const init = (params.page - 1) * perPage

      params.limit = parseInt(perPage)
      params.offset = parseInt(init)
    }
    console.log(params)
    return params
  }
}

module.exports = new ORM()