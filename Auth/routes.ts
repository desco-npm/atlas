// Framework Modules
/* /--/ */

// Necessary parts
import Auth from './'
import AuthConfig from './Config'

// Types
import { ServerRouterParams, } from '../Server/types'

export default ({ Express, }: ServerRouterParams) => {
  Express.post(AuthConfig.get('routes.register'), (req, res) => {
    Auth.register(req.body)
      .then(response => res.json(response))
      .catch(e => {
        res.status(e.statusCode).json(e)
      })
  })

  Express.post(AuthConfig.get('routes.login'), (req, res) => {
    Auth.login(req.body)
      .then(response => res.json(response))
      .catch(e => res.status(e.statusCode).json(e))
  })

  Express.post(AuthConfig.get('routes.sendActiveCode'), (req, res) => {
    Auth.sendActiveCodeMail(req.body)
      .then(response => res.json(response))
      .catch(e => res.status(e.statusCode).json(e))
  })

  Express.post(AuthConfig.get('routes.active'), (req, res) => {
    Auth.active(req.body)
      .then(response => res.json(response))
      .catch(e => res.status(e.statusCode).json(e))
  })

  Express.post(AuthConfig.get('routes.sendRefreshPasswordCode'), (req, res) => {
    Auth.sendRefreshPasswordCode(req.body)
      .then(response => res.json(response))
      .catch(e => res.status(e.statusCode).json(e))
  })

  Express.post(AuthConfig.get('routes.refreshPassword'), (req, res) => {
    Auth.refreshPassword(req.body)
      .then(response => res.json(response))
      .catch(e => res.status(e.statusCode).json(e))
  })

  Express.post(AuthConfig.get('routes.logout'), (req, res) => {
    Auth.logout(req.headers.authorization)
      .then(response => res.json(response))
      .catch(e => res.status(e.statusCode).json(e))
  })
}