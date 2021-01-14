//TODO: change() deve receber id pelo body - https://trello.com/c/6xyRcYCo/43-change-deve-receber-id-pelo-body
module.exports = ({ Model, Op, }) => {
  return {
    router ({ express, entity, }) {
      express.get(`/crud/${entity}/`, async (req, res) => {
        res.json(await this.select({
          ...req.query,
          where: req.query.where ? this.treatWhere(req.query.where) : undefined,
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
      return this.findAndCountAll(treatParameters(params))
        .then(result => {
          result.rows = result.rows.map(i => i.toJSON())

          return result
        })
        .catch(e => {
          return e
        })
    },
    async selectOne (params) {
      return this.findOne(treatParameters(params))
        .then(response => response ? response.toJSON(): null)
    },
    async selectById (id) {
      return (await this.findByPk(id)).toJSON()
    },
    async selectOrCreate (params) {
      return this.findOrCreate({
        where: treatParameters(params).where,
        defaults: params.create,
      })
        .then(result => {
          result[0] = result[0].toJSON()

          return result
        })
        .catch(e => console.log(e))
    },
    insert (data) {
      return this.create(data)
        .then(response => {
          return this.read(response.id)
        })
        .catch(e => {
          return e
        })
    },
    async read (id) {
      return (await this.findByPk(id)).toJSON()
    },
    change (body, id) {
      return this.update(body, { where: { id, }, })
        .then(async () => {
          return this.read(id)
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
          },
        }))
          .catch(e => {
            return e
          }),
      }
    },
  }
}

function treatParameters (params) {
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

  return params
}