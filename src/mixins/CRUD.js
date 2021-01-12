module.exports = ({ Model, Op, }) => {
  return {
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
        ...params,
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
        .catch(e => {
          return e
        })
    },
    insert (data) {
      return this.create(data)
        .then(response => {
          return this.findByPk(response.id)
        })
        .catch(e => {
          return e
        })
    },
    async read (id) {
      return await this.findByPk(id)
    },
    change (body, id) {
      return this.update(body, { where: { id, }, })
        .then(async () => {
          return this.findByPk(id)
        })
        .catch(e => {
          return e
        })
    },
    async delete (ids) {
      return {
        count: (await this.destroy({
          where: {
            id: {
              [ Op.in ]: ids.split(';'),
            },
          }
        }))
        .catch(e => {
          return e
        })
      } 
    }
  }
}