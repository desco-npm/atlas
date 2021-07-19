import { ServerRouterParams, } from '../../Server/types'
import Mail from '../../Mail'

export default (params: ServerRouterParams) => {
  const { Express, } = params

  Express.get(`/teste`, (req, res) => {
    Mail.transporter()?.sendMail({
      from: 'eu@diasrafael.com.br',
      to: 'eu@diasrafael.com.br',
      html: 'ola mundo'
    })

    res.json({ ok: 1})
  })
}