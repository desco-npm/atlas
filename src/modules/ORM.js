const { Sequelize, DataTypes, Model } = require('sequelize')
let sequelize

require('../functions')

class ORM {
  constructor () {
    this.modelsDir = pathJoin(projectDir, 'models')
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

    return Model.init(defs || {}, { ...(opts || {}), sequelize: sequelize, })
  }

  async importModels () {
    const models = await readdir(this.modelsDir)
    let promises = []

    models.map(modelName => {
      const modelAddrs = pathJoin(this.modelsDir, modelName)

      promises.push(require(modelAddrs)({ ORM: this, DataTypes, Model, }))
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

  commit () {
    return sequelize.commit()
  }

  rollback () {
    return sequelize.rollback()
  }
}

module.exports = new ORM()