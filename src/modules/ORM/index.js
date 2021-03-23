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
      process.env.Atlas.Orm.Db.name,
      process.env.Atlas.Orm.Db.user,
      process.env.Atlas.Orm.Db.password,
      {
        logging: process.env.Atlas.Orm.Db.log,
        host: process.env.Atlas.Orm.Db.host,
        dialect: process.env.Atlas.Orm.Db.dialog,
        pool: {
          max: parseInt(process.env.Atlas.Orm.pool.max),
          min: parseInt(process.env.Atlas.Orm.pool.min),
          acquire: parseInt(process.env.Atlas.Orm.pool.idle),
          idle: parseInt(process.env.Atlas.Orm.pool.acquire),
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

    const uidDefaultVersion = parseInt(process.env.Atlas.Orm.UID_DEFAULT_VERSION)
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
      .filter(i => i !== 'index')

    models.map(modelName => {
      const modelAddrs = pathJoin(this.modelsDir, modelName)

      promises.push(require(modelAddrs)({ DataTypes, Orm: this, }))
    })

    return Promise.all(promises)
  }

  sync () {
    const sync = process.env.Atlas.Orm.sync
    const forceSync = process.env.Atlas.Orm.sync_force
    const alterSync = process.env.Atlas.Orm.sync_alter

    if (!sync && !forceSync && !alterSync) return

    return sequelize.sync({
      force: process.env.Atlas.Orm.sync_force,
      alter: process.env.Atlas.Orm.sync_alter,
    })
  }

  transaction (fn) {
    return sequelize.transaction(fn)
  }

  listModels () {
    return sequelize.models
  }
}

module.exports = new ORM()