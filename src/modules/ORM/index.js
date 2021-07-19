const { Sequelize, DataTypes, Op, } = require('sequelize')
const pathJoin = require('../../../lib/pathJoin')
const objectMap = require('../../../lib/objectMap')
const mkdirIfNotExists = require('../../../lib/mkdirIfNotExists')
const readDir = require('../../../lib/readDir')

let sequelize

class ORM {
  constructor () {
    if (!Atlas.Config.get('Orm')) return

    Atlas.Config.setDefault('Orm.Uid.DefaultVersion', 4)

    Atlas.Config.setDefault('Orm.Db.log', typeof Atlas.Config.get('Orm.Db.log') === 'function'
      ? Atlas.Config.get('Orm.Db.log')
      : Atlas.Config.get('Orm.Db.log')
        ? console.log
        : () => {}
    )

    Atlas.Config.setDefault('Orm.pkName', 'id')

    this.modelsDir = pathJoin(projectDir, 'models')
    this.pos = {}

    mkdirIfNotExists(this.modelsDir)
  }

  async init () {
    if (!Atlas.Config.get('Orm')) return Promise.resolve()
    await this.connect()
    await this.importModels()
    await this.posDefines()

    return Promise.resolve()
  }

  async start () {
    if (!Atlas.Config.get('Orm')) return Promise.resolve()

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
      Atlas.Config.get('Orm.Db.name'),
      Atlas.Config.get('Orm.Db.user'),
      Atlas.Config.get('Orm.Db.password'),
      {
        logging: Atlas.Config.get('Orm.Db.log'),
        host: Atlas.Config.get('Orm.Db.host'),
        port: Atlas.Config.get('Orm.Db.port'),
        dialect: Atlas.Config.get('Orm.Db.dialog'),
        pool: {
          max: parseInt(Atlas.Config.get('Orm.pool.max')),
          min: parseInt(Atlas.Config.get('Orm.pool.min')),
          acquire: parseInt(Atlas.Config.get('Orm.pool.idle')),
          idle: parseInt(Atlas.Config.get('Orm.pool.acquire')),
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

    name = name || trace[1].getFileName().split(pathSep).pop().split('.')[0]

    this.pos[name] = pos

    const uidDefaultVersion = parseInt(Atlas.Config.get('Orm.Uid.DefaultVersion'))
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

    const models = (await readDir(this.modelsDir))
      .map(i => i.slice(0, -3))
      .filter(i => i !== 'index')

    models.map(modelName => {
      const modelAddrs = pathJoin(this.modelsDir, modelName)

      promises.push(require(modelAddrs)({ DataTypes, Orm: this, }))
    })

    return Promise.all(promises)
  }

  sync () {
    const sync = Atlas.Config.get('Orm.sync')
    const forceSync = Atlas.Config.get('Orm.sync_force')
    const alterSync = Atlas.Config.get('Orm.sync_alter')

    if (!sync && !forceSync && !alterSync) return

    return sequelize.sync({
      force: Atlas.Config.get('Orm.sync_force'),
      alter: Atlas.Config.get('Orm.sync_alter'),
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