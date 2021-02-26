const Express = require('express')
const Cors = require('cors')
const BodyParser = require('body-parser')
const Helmet = require('helmet')

let express

class Server {
  constructor () {
    express = Express()

    express.use(Cors())
    express.use(BodyParser.urlencoded({ extended: false, }))
    express.use(BodyParser.json())
    express.use(Helmet())

    this.routesDir = pathJoin(projectDir, 'routes')
  }

  async init () {
    this.defineStatic()

    this.useMiddleware()

    await this.importRoutes()

    return Promise.resolve()
  }

  async useMiddleware () {
    const addrs = pathJoin(projectDir, 'middlewares.js')

    if (await fileExists(addrs)) {
      require(addrs)({
        express,
        models: Atlas.Orm.listModels(),
      })
    }
  }

  start () {
    let port = parseInt(process.env.Atlas.SERVER_PORT)

    express.listen(port, () => {
      console.log(`Server listening at port ${port}`)
    })
  }

  defineStatic () {
    const staticList = process.env.Atlas.SERVER_STATIC.split(';')

    staticList.map(staticItem => {
      const [ dir, prefix, ] = staticItem.split(',')

      if (prefix) {
        express.use(prefix, Express.static(pathJoin(projectDir, dir)))
      }
      else {
        express.use(Express.static(pathJoin(projectDir, dir)))
      }
    })
  }

  async importRoutes () {
    const routes = (await readdir(this.routesDir)).map(i => i.slice(0, -3))
    const models = Object.keys(Atlas.Orm.listModels())
    const entities = [ ...routes, ...models, ]
    const promises = []

    entities.map(entity => {
      promises.push(this.loadRouteByEntity(entity))
    })

    return Promise.all(promises)
  }

  async loadRouteByEntity (entity) {
    const routeModelAddrs = pathJoin(this.routesDir, entity)
    const models = Atlas.Orm.listModels()
    const routeParams = {
      express,
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

  express () {
    return express
  }
}

module.exports = new Server()