module.exports = ({ express, entity, Model, models, }) => {
  if (!Model) return

  express.get(`/crud/${entity}/`, async (req, res) => {
    const query = frontToSequelize(req.query, models, Atlas.Orm.Sequelize())

    res.json(await Model.select(query))
  })

  express.post(`/crud/${entity}/`, async (req, res) => {
    const data = req.body
    const query = frontToSequelize(req.query, models, Atlas.Orm.Sequelize())

    res.json(await Model.insert(data, query))
  })

  express.get(`/crud/${entity}/:id`, async (req, res) => {
    const id = req.params.id
    const query = frontToSequelize(req.query, models, Atlas.Orm.Sequelize())

    res.json(await Model.read(id, query))
  })

  express.put(`/crud/${entity}/:id`, async (req, res) => {
    const data = { id: req.params.id, ...req.body, }
    const query = frontToSequelize(req.query, models, Atlas.Orm.Sequelize())

    res.json(await Model.change(data, query))
  })

  express.delete(`/crud/${entity}/:id`, async (req, res) => {
    res.json(await Model.delete(req.params.id))
  })
}