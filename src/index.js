require('./functions')
require('./globals')

const Orm = require('./modules/ORM')
const Server = require('./modules/Server')

module.exports = async () => {
  require('./env.js')()

  await Orm.init()
  await Server.init()
}