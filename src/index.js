//TODO: PDF - https://trello.com/c/h6gkNj17/18-pdf
//TODO: Controle de permissoes - https://trello.com/c/L4YFDwa1/19-controle-de-permissoes
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