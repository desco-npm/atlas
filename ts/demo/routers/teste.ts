import { ServerRouterParams, } from '../../Server/types'

export default (params: ServerRouterParams) => {
  const { Express, } = params

  Express.get(`/teste`, (req, res) => {
    res.json({ ok: 1})
  })
}