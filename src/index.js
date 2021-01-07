//TODO: Auth - https://trello.com/c/1P8rC9Kg/15-auth
//TODO: Email - https://trello.com/c/LPPtBoUF/16-email
//TODO: PDF - https://trello.com/c/h6gkNj17/18-pdf
//TODO: Controle de permissoes - https://trello.com/c/L4YFDwa1/19-controle-de-permissoes
//TODO: Migrações - https://trello.com/c/pF6LJKPU/21-migra%C3%A7%C3%B5es
//TODO: Transições - https://trello.com/c/J2l5Tvrj/22-transições

const cliHeader = require('@desco/cli-header')

require('./functions')
require('./globals')

const Orm = require('./modules/Orm')
const Server = require('./modules/Server')

module.exports = async () => {
  cliHeader({ title: 'AtlasJS v2.0.0', size: 25, align: 'center', })

  require('./env.js')()

  await Orm.init()
  await Server.init()
}