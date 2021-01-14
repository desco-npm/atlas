//TODO: Rotas validar permissão - https://trello.com/c/w1bdRzRT/47-rotas-validar-permiss%C3%A3o
//TODO: RefreshToken - https://trello.com/c/iHS9PuI8/48-refreshtoken

module.exports = ({ express, Model, }) => {
  express.post('/login', async (req, res) => {
    res.json(await Model.login(req.body.mail, req.body.password))
  })

  if (process.env.Atlas.GOOGLE_AUTH) {
    express.get('/oauth/google', async (req, res) => {
      res.json({ url: await Model.googleLogin(req.headers.host), })
    })

    express.get('/oauth/google/callback', async (req, res) => {
      res.json(await Model.googleCallback(req.headers.host, req.query.code))
    })
  }
}