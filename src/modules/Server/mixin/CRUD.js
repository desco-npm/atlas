module.exports = ({ express, entity, Model, models, }) => {
  if (!Model) return

  express.get(`/crud/${entity}/`, async (req, res) => {
    res.json(await Model.select(frontToSequelize(req.query, models, Atlas.Orm.Sequelize())))
  })

  express.post(`/crud/${entity}/`, async (req, res) => {
    res.json(await Model.insert(req.body))
  })

  express.get(`/crud/${entity}/:id`, async (req, res) => {
    res.json(
      await Model.read(req.params.id, frontToSequelize(req.query, models, Atlas.Orm.Sequelize()))
    )
  })

  express.put(`/crud/${entity}/:id`, async (req, res) => {
    res.json(await Model.change({ id: req.params.id, ...req.body, }))
  })

  express.delete(`/crud/${entity}/:id`, async (req, res) => {
    res.json(await Model.delete(req.params.id))
  })
}