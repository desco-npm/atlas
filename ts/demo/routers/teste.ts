import { IServerRouterParams, } from '../../Server/types'

export default (params: IServerRouterParams) => {
  const { Express, entity } = params

  Express.get(`/${entity}`, (req, res) => {
    res.json({ ok: 1})
  })
}