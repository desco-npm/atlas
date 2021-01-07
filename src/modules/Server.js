const Express = require('express')
const Cors = require('cors')
const BodyParser = require('body-parser')
const Helmet = require('helmet')
const objectMap = require('object.map')
const { stat } = require('fs-extra')

const Orm = require('./ORM')

let express

class Server {
  constructor () {
    express = Express()

    express.use(Cors())
    express.use(BodyParser.urlencoded({ extended: false }))
    express.use(BodyParser.json())
    express.use(Helmet())

    this.routesDir = pathJoin(projectDir, 'routes')
    this.middlewareDir = pathJoin(projectDir, 'middleware')
  }

  async init () {
    this.defineStatic()
    await this.importMiddleware()
    await this.importRoutes()

    this.start()

    return Promise.resolve()
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

  middlewareExists () {
    const addrs = pathJoin(this.middlewareDir, 'index.js')

    return fileExists(addrs)
  }

  importMiddleware () {
    if (!this.middlewareExists()) return

    const addrs = pathJoin(this.middlewareDir, 'index')

    const middlewareList = require(addrs)

    middlewareList.map(middleware => {
      express.use(middleware)
    })
  }

  async loadMiddlewareList () {
    if (!this.middlewareExists()) return {}

    const middlewareList = await readdir(this.middlewareDir)
    const middlewareObj = {}

    middlewareList
      .filter(middleware => middleware !== 'index.js')
      .map(middlewareName => {
        middlewareName = middlewareName.slice(0, -3)
        middlewareObj[middlewareName] = require(pathJoin(this.middlewareDir, middlewareName))
      })

    return middlewareObj
  }

  async importRoutes () {
    const routeModels = await readdir(this.routesDir)
    const middlewareList = await this.loadMiddlewareList()

    routeModels.map(routeModelName => {
      routeModelName = routeModelName.slice(0, -3)

      const routeModelAddrs = pathJoin(this.routesDir, routeModelName)

      const models = Orm.listModels()
      
      require(routeModelAddrs)({
        express,
        entity: routeModelName,
        middleware: middlewareList,
        models,
        model: models[routeModelName]
      })

      this.defineDefaultRoute(routeModelName)
    })

    return Promise.resolve()
  }

  defineDefaultRoute (entity) {
    const model = Orm.listModels()[entity]

    //TODO: Ordenação - https://trello.com/c/NE7dQNSq/10-ordena%C3%A7%C3%A3o
    //TODO: Paginação - https://trello.com/c/mYpovHSk/11-pagina%C3%A7%C3%A3o
    express.get(`/${entity}/`, async (req, resp) => {
      resp.json(await model.findAndCountAll())
    })

    express.post(`/${entity}/`, async (req, resp) => {
      resp.json(await model.create(req.body))
    })

    express.get(`/${entity}/:id`, async (req, resp) => {
      resp.json(await model.findByPk(req.params.id))
    })

    express.put(`/${entity}/:id`, (req, resp) => {
      model.update(req.body, { where: { id: req.params.id }})
        .then(async () => {
          resp.json(await model.findByPk(req.params.id))
        })
        .catch (e => {
          resp.json(e)
        })
    })

    //TODO: Remoção em massa - https://trello.com/c/UZKrRIpE/12-remo%C3%A7%C3%A3o-em-massa
    express.delete(`/${entity}/:id`, async (req, resp) => {
      resp.json(await model.destroy({ where: { id: req.params.id }}))
    })
  }

  start () {
    let port = parseInt(process.env.Atlas.SERVER_PORT)

    express.listen(port, () => {
      console.log(`Server listening at port ${port}`)
    })
  }
}

module.exports = new Server()