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
    this.mixinDir = pathJoin(atlasDir, 'modules', 'Server', 'mixin')
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

  async loadMixinList () {
    const mixinList = await readdir(this.mixinDir)
    const mixinObj = {}

    mixinList
      .filter(mixin => mixin !== 'index.js')
      .map(mixinName => {
        mixinName = mixinName.slice(0, -3)
        mixinObj[mixinName] = require(pathJoin(this.mixinDir, mixinName))
      })

    return mixinObj
  }

  async importRoutes () {
    const routeModels = await readdir(this.routesDir)

    routeModels.map(routeModelName => {
      const entity = routeModelName.slice(0, -3)

      this.loadRouteByEntity(entity)
    })

    return Promise.resolve()
  }

  async loadRouteByEntity (entity) {
    const middlewareList = await this.loadMiddlewareList()
    const mixinList = await this.loadMixinList()

    const routeModelAddrs = pathJoin(this.routesDir, entity)
    const routeParams = {
      express,
      entity,
      middleware: middlewareList,
      mixin: mixinList,
      Model: Atlas.Orm.listModels()[entity],
    }

    if (await fileExists(routeModelAddrs)) {
      require(routeModelAddrs)(routeParams)
    }

    mixinList.CRUD(routeParams)

    return Promise.resolve()
  }

  express () {
    return express
  }
}

module.exports = new Server()