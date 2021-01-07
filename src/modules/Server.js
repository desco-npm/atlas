const Express = require('express')
const Cors = require('cors')
const BodyParser = require('body-parser')
const Helmet = require('helmet')

const Orm = require('./Orm')

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
        model: models[routeModelName],
        Op: Orm.Op
      })

      this.defineDefaultRoute(routeModelName)
    })

    return Promise.resolve()
  }

  defineDefaultRoute (entity) {
    const model = Orm.listModels()[entity]

    if (!model) return

    const Op = Orm.Op

    express.get(`/${entity}/`, async (req, resp) => {
      const params = {
        order: !req.query.order
          ? [ [ 'createdAt', 'DESC', ], ]
          : req.query.order.split(';').map(i => i.split(':')),
        offset: req.query.offset ? parseInt(req.query.offset) : undefined,
        limit: req.query.limit ? parseInt(req.query.limit) : undefined,
        where: req.query.where ? Orm.treatWhere(req.query.where) : {}
      }

      if (req.query.page) {
        const perPage = req.query.perPage || process.env.Atlas.ORM_PER_PAGE
        const init = (req.query.page - 1) * perPage

        params.limit = parseInt(perPage)
        params.offset = parseInt(init)
      }

      resp.json(await model.findAndCountAll(params))
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

    express.delete(`/${entity}/:id`, async (req, resp) => {
      const ids = { [ Op.in ]: req.params.id.split(';'), }

      resp.json({ count: await model.destroy({ where: { id: ids, }}), })
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