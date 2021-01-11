const { Sequelize, DataTypes, Op, } = require('sequelize')

let sequelize

//TODO: Validações no ORM - https://trello.com/c/k2vo9AWU/32-valida%C3%A7%C3%B5es-no-orm
//TODO: Migrações - https://trello.com/c/pF6LJKPU/21-migra%C3%A7%C3%B5es
//TODO: Transições - https://trello.com/c/J2l5Tvrj/22-transições
//TODO: Login com redes sociais - https://trello.com/c/TM9vRY23/29-login-com-redes-sociais
class ORM {
  constructor () {
    this.modelsDir = pathJoin(projectDir, 'models')
    this.nativeModelsDir = pathJoin(atlasDir, 'models')
    this.Op = Op
    this.pos = {}
  }

  async init () {
    this.User_UserGroup = [
      process.env.Atlas.PERMISSION_USER_MODEL,
      process.env.Atlas.PERMISSION_GROUP_MODEL
    ]
      .sort()
      .join('_')

    await this.connect()
    await this.importModels([ 'User_UserGroup', 'Permission', ])
    await this.importModels()
    await this.setAssociations()
    await this.posDefines()
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

  posDefines () {
    objectMap(this.pos, (pos, modelName) => {
      const models = this.listModels() 

      pos({ models, Model: models[modelName], })

    })
  }

  setDefs (defs, name) {
    let newDefs = {
      id: defs.id || {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
    }

    if (name === process.env.Atlas.PERMISSION_USER_MODEL) {
      newDefs = {
        ...newDefs,
        login: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(32),
          allowNull: false,
        }
      }
    }
    else if (name === process.env.Atlas.PERMISSION_GROUP_MODEL) {
      newDefs = {
        ...newDefs,
        name: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
      }
    }

    return { ...newDefs, ...defs, }
  }

  setAssociations () {
    const models = this.listModels()

    objectMap(models, (Model, modelName) => {
      if (modelName === process.env.Atlas.PERMISSION_USER_MODEL) {
        Model.belongsToMany(models[process.env.Atlas.PERMISSION_GROUP_MODEL], {
          through: models[this.User_UserGroup]
        })
      }
      else if (modelName === process.env.Atlas.PERMISSION_GROUP_MODEL) {
        Model.belongsToMany(models[process.env.Atlas.PERMISSION_USER_MODEL], {
          through: models[this.User_UserGroup]
        })
      }
    })
  }

  async addModel ({ name, defs, opts, mixins, pos, }) {
    // Duas próximas precisam estar antes do await
    // Two next ones need to be before await
    const trace = stackTrace.get();

    name = name || trace[1].getFileName().split('\\').pop().slice(0, -3)

    this.pos[name] = pos

    await this.connect()

    defs = this.setDefs(defs, name)

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
    
    Model.Op = Op

    this.mixins({ Model, mixins, name, })

    return Model
  }

  mixins ({ Model, name, mixins = {}, }) {
    mixins.CRUD = require('../mixins/CRUD')

    objectMap(mixins, (mixin, mixinName) => {
      objectMap(mixin, (v, k) => {
        k = !Model[k] ? k : `${k}_${mixinName}`

        Model[k] = v

        if (k === 'router') {
          Model.router({
            express: require('./Server').express(),
            entity: name,
            models: this.listModels(),
          })

          delete Model.router
        }
      })
    })

    return Model
  }

  async importModels (models) {
    const nativeModels = models !== undefined
    let promises = []

    models = models || (await readdir(this.modelsDir)).map(i => i.slice(0, -3))

    models.map(modelName => {
      const modelAddrs = pathJoin(nativeModels ? this.nativeModelsDir : this.modelsDir, modelName)

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