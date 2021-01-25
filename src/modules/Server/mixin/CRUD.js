module.exports = ({ express, entity, Model, }) => {
  express.get(`/crud/${entity}/`, async (req, res) => {
    res.json(await Model.select({
      ...req.query,
      where: req.query.where ? Model.treatWhere(req.query.where) : undefined,
    }))
  })

  express.post(`/crud/${entity}/`, async (req, res) => {
    res.json(await Model.insert(req.body))
  })

  express.get(`/crud/${entity}/:id`, async (req, res) => {
    res.json(await Model.read(req.params.id))
  })

  express.put(`/crud/${entity}/:id`, async (req, res) => {
    res.json(await Model.change(req.body, req.params.id))
  })

  express.delete(`/crud/${entity}/:id`, async (req, res) => {
    res.json(await Model.delete(req.params.id))
  })
}