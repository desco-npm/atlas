module.exports = {
  router ({ express, entity, }) {
    express.get(`/crud/${entity}/`, async (req, res) => {
      res.json(await this.select({
        ...req.query,
        where: req.query.where ? this.treatWhere(req.query.where) : undefined
      }))
    })

    express.post(`/crud/${entity}/`, async (req, res) => {
      res.json(await this.insert(req.body))
    })

    express.get(`/crud/${entity}/:id`, async (req, res) => {
      res.json(await this.read(req.params.id))
    })

    express.put(`/crud/${entity}/:id`, async (req, res) => {
      res.json(await this.change(req.body, req.params.id))
    })

    express.delete(`/crud/${entity}/:id`, async (req, res) => {
      res.json(await this.delete(req.params.id))
    })
  },
  async select (params) {
    params = {
      order: !params.order
        ? [ [ 'createdAt', 'DESC', ], ]
        : params.order.split(';').map(i => i.split(':')),
      offset: params.offset ? parseInt(params.offset) : undefined,
      limit: params.limit ? parseInt(params.limit) : undefined,
    }

    if (params.page) {
      const perPage = params.perPage || process.env.Atlas.ORM_PER_PAGE
      const init = (params.page - 1) * perPage

      params.limit = parseInt(perPage)
      params.offset = parseInt(init)
    }

    return await this.findAndCountAll(params)
  },
  async insert (data) {
    return await this.create(data)
  },
  async read (id) {
    return await this.findByPk(id)
  },
  async change (body, id) {
    return this.update(body, { where: { id, }, }).then(async () => {
      return await this.findByPk(req.params.id)
    })
  },
  async delete (ids) {
    return {
      count: await this.destroy({
        where: {
          id: {
            [ this.Op.in ]: ids.split(';'),
          },
        }
      }),
    } 
  }
}