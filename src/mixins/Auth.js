module.exports = {
  router ({ express, entity, }) {
    express.post(`/${entity}/login`, async (req, res) => {
      res.json(await this.login(req.body.login, req.body.password))
    })
  },
  login (login, password) {
    return this.select({ where: { login, password, }, })
  },
}