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

  async addModel ({ defs, opts, mixins, }) {
    // Duas próximas precisam estar antes do await
    // Two next ones need to be before await
    const trace = stackTrace.get();
    const name = trace[1].getFileName().split('\\').pop().slice(0, -3)

    await this.connect()

    defs = {
      id: defs.id || {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      ...(
        name === process.env.Atlas.PERMISSION_USER_MODEL
          ? 
          {
            login: {
              type: DataTypes.STRING(100),
            },
            password: {
              type: DataTypes.STRING(32),
            },
          }
          : {}
      ),
      ...(
        name === process.env.Atlas.PERMISSION_GROUP_MODEL
          ? 
          {
            name: {
              type: DataTypes.STRING(100),
            },
          }
          : {}
      ),
      ...defs,
    }

    


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

  async importModels () {
    const models = (await readdir(this.modelsDir)).map(i => i.slice(0, -3))
    let promises = []

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