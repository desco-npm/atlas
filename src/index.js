//TODO: PDF - https://trello.com/c/h6gkNj17/18-pdf
//TODO: Controle de permissoes - https://trello.com/c/L4YFDwa1/19-controle-de-permissoes
//TODO: Migrações - https://trello.com/c/pF6LJKPU/21-migra%C3%A7%C3%B5es
//TODO: Transições - https://trello.com/c/J2l5Tvrj/22-transições
//TODO: Login com redes sociais - https://trello.com/c/TM9vRY23/29-login-com-redes-sociais
//TODO: DiscordBot - https://trello.com/c/iK7f9pRi/31-discordbot

const cliHeader = require('@desco/cli-header')

require('./functions')
require('./globals')

const Mail = require('./modules/Mail')
const Orm = require('./modules/Orm')
const Server = require('./modules/Server')

module.exports = async () => {
  cliHeader({ title: 'AtlasJS v2.0.0', size: 25, align: 'center', })

  require('./env.js')()

  await Orm.init()
  await Mail.init()
  await Server.init()
}