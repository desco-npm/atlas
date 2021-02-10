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
    this.middlewareDir = pathJoin(projectDir, 'middleware')
  }

  async init () {
    this.defineStatic()

    await this.importRoutes()

    return Promise.resolve()
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

  async loadMiddlewareList () {
    if (!fileExists(this.middlewareDir)) return {}

    const middlewareList = await readdir(this.middlewareDir)
    const middlewareObj = {}

    middlewareList
      .map(middlewareName => {
        middlewareName = middlewareName.slice(0, -3)
        middlewareObj[middlewareName] = require(pathJoin(this.middlewareDir, middlewareName))
      })

    return middlewareObj
  }

  async importRoutes () {
    const routeModels = await readdir(this.routesDir)
    const promises = []

    routeModels.map(routeModelName => {
      const entity = routeModelName.slice(0, -3)

      promises.push(this.loadRouteByEntity(entity))
    })

    return Promise.all(promises)
  }

  async loadRouteByEntity (entity) {
    const middlewareList = await this.loadMiddlewareList()

    const routeModelAddrs = pathJoin(this.routesDir, entity)
    const routeParams = {
      express,
      entity,
      middleware: middlewareList,
      Model: Atlas.Orm.listModels()[entity],
    }

    require('./mixin/CRUD')(routeParams)

    if (await fileExists(routeModelAddrs)) {
      require(routeModelAddrs)(routeParams)
    }

    return Promise.resolve()
  }

  express () {
    return express
  }
}

module.exports = new Server()