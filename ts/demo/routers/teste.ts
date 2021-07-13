import { IServerRouterParams, } from '../../Server'

export default (params: IServerRouterParams) => {
  const { Express, } = params

  Express.get(`/teste`, (req, res) => {
    res.json({ ok: 1})
  })
}