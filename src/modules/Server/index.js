const Express = require('express')
const Cors = require('cors')
const BodyParser = require('body-parser')
const isArray = require('is-array')
// const Helmet = require('helmet')

class Server {
  constructor () {
    Atlas.Config.setDefault('Server.origin', '*')

    this.express = Express()
    const corsOptions = {
      origin: Atlas.Config.get('Server.origin'),
    }

    this.express.use(Cors(corsOptions))

    this.express.use(BodyParser.urlencoded({
      extended: false,
      limit: Atlas.Config.get('Server.limit'),
    }))

    this.express.use(BodyParser.json({
      limit: Atlas.Config.get('Server.limit'),
    }))

    // this.express.use(Helmet())

    this.routesDir = pathJoin(projectDir, 'routes')

    mkdirIfNotExists(this.routesDir)
  }

  async init () {
    return Promise.resolve()
  }

  async start () {
    this.defineStatic()

    await this.importRoutes()

    let port = parseInt(Atlas.Config.get('Server.port'))

    this.express.listen(port, () => {
      console.log(`Server listening at port ${port}`)
    })
  }

  defineStatic () {
    const staticList = isArray(Atlas.Config.get('Server.static'))
      ? Atlas.Config.get('Server.static')
      : [ Atlas.Config.get('Server.static'), ]

    staticList.map(staticItem => {
      const [ dir, prefix, ] = staticItem.split(',')

      if (prefix) {
        this.express.use(prefix, Express.static(pathJoin(projectDir, dir)))
      }
      else {
        this.express.use(Express.static(pathJoin(projectDir, dir)))
      }
    })
  }

  async importRoutes () {
    const routes = (await readdir(this.routesDir)).map(i => i.slice(0, -3))
    const models = Atlas.Config.get('Orm') ? Object.keys(Atlas.Orm.listModels()) : []
    const entities = [ ...routes, ...models, ]
    const promises = []

    entities.map(entity => {
      promises.push(this.loadRouteByEntity(entity))
    })

    return Promise.all(promises)
  }

  async loadRouteByEntity (entity) {
    const routeModelAddrs = pathJoin(this.routesDir, entity)
    const models = Atlas.Config.get('Orm') ? Atlas.Orm.listModels() : []
    const routeParams = {
      express: this.express,
      entity,
      models,
      Model: models[entity],
    }

    require('./mixin/CRUD')(routeParams)

    if (await fileExists(routeModelAddrs + '.js')) {
      require(routeModelAddrs)(routeParams)
    }

    return Promise.resolve()
  }
}

module.exports = new Server()