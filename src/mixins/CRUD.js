module.exports = {
  router ({ express, entity, }) {
    express.get(`/crud/${entity}/`, async (req, res) => {
      res.json(await this.select(req))
    })

    express.post(`/crud/${entity}/`, async (req, res) => {
      res.json(await this.insert(req))
    })

    express.get(`/crud/${entity}/:id`, async (req, res) => {
      res.json(await this.read(req))
    })

    express.put(`/crud/${entity}/:id`, async (req, res) => {
      res.json(await this.update(req))
    })

    express.delete(`/crud/${entity}/:id`, async (req, res) => {
      res.json(await this.delete(req))
    })
  },
  async select (req) {
    const params = {
      order: !req.query.order
        ? [ [ 'createdAt', 'DESC', ], ]
        : req.query.order.split(';').map(i => i.split(':')),
      offset: req.query.offset ? parseInt(req.query.offset) : undefined,
      limit: req.query.limit ? parseInt(req.query.limit) : undefined,
      where: req.query.where ? this.treatWhere(req.query.where) : {}
    }

    if (req.query.page) {
      const perPage = req.query.perPage || process.env.Atlas.ORM_PER_PAGE
      const init = (req.query.page - 1) * perPage

      params.limit = parseInt(perPage)
      params.offset = parseInt(init)
    }

    return await this.findAndCountAll(params)
  },
  async insert (req) {
    return await this.create(req.body)
  },
  async read (req) {
    return await this.findByPk(req.params.id)
  },
  async update (req) {
    return this.update(req.body, { where: { id: req.params.id }}).then(async () => {
      return await this.findByPk(req.params.id)
    })
  },
  async delete (req) {
    const ids = { [ this.Op.in ]: req.params.id.split(';'), }

    return { count: await this.destroy({ where: { id: ids, }}), }
  }
}