module.exports = {
  router ({ express, entity, }) {
    express.post(`/${entity}/login`, async (req, res) => {
      res.json(await this.login(req))
    })
  },
  login (req) {
    req.query.where = `{ "login": "${req.body.login}", "password": "${req.body.password}" }`

    return this.select(req)
  }
}