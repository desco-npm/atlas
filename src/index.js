const cliHeader = require('@desco/cli-header')

require('./functions')
require('./globals')

const Orm = require('./modules/ORM')
const Server = require('./modules/Server')

module.exports = async () => {
  cliHeader({ title: 'AtlasJS v2.0.0', size: 25, align: 'center', })

  require('./env.js')()

  await Orm.init()
  await Server.init()
}