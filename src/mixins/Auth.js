//TODO: Rotas validar permissão - https://trello.com/c/w1bdRzRT/47-rotas-validar-permiss%C3%A3oconst moment = require('moment')
//TODO: RefreshToken - https://trello.com/c/iHS9PuI8/48-refreshtoken

module.exports = {
  router ({ express, }) {
    express.post('/login', async (req, res) => {
      res.json(await this.login(req.body.mail, req.body.password))
    })

    if (process.env.Atlas.GOOGLE_AUTH) {
      express.get('/oauth/google', async (req, res) => {
        res.json({ url: await this.googleLogin(req.headers.host), })
      })

      express.get('/oauth/google/callback', async (req, res) => {
        res.json(await this.googleCallback(req.headers.host, req.query.code))
      })
    }
  },
  login (mail, password) {
    if (!password) return null

    const operationParams = {
      where: {
        mail,
        password,
      },
    }

    return this.selectOne(operationParams).then(response => {
      if (!response) return null
      const User = {
        ...response,
        token: generateToken(
          response,
          process.env.Atlas.AUTH_SECRET,
          { algorithm: process.env.Atlas.AUTH_ALGORITHM, }
        ),
        tokenType: 'default',
        expireToken: moment().add(1, 'hours').unix(),
      }

      return this.change(User, User.id)
    })
  },
  googleLogin (host) {
    const GoogleAPI = newGoogleAPI(host)

    return GoogleAPI.generateAuthUrl()
  },
  async googleCallback (host, code) {
    const GoogleAPI = newGoogleAPI(host)

    try {
      const tokens = await GoogleAPI.setCredentials(code)

      const token = {
        token: tokens.access_token,
        tokenType: 'google',
        expireToken: tokens.expiry_date,
      }

      const info = await GoogleAPI.userInfo()

      let [ User, created, ] = await this.selectOrCreate({
        where: {
          mail: info.data.email,
        },
        create: {
          mail: info.data.email,
          ...token,
        },
      })

      if (!created) {
        User = await this.change(token, User.id)
      }

      return { ...token, ...User, }
    }
    catch (e) {
      return { message: 'Error in login on Google', error: e, }
    }
  },
}

function newGoogleAPI (host) {
  const { Google, } = require('@desco/social-auth')

  return new Google({
    id: process.env.Atlas.GOOGLE_AUTH_ID,
    key: process.env.Atlas.GOOGLE_AUTH_KEY,
    callbackUrl: `http://${host}/oauth/google/callback`,
  })
}