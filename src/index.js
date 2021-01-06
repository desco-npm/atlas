require('./functions')
require('./globals')

const Orm = require('./modules/ORM')

module.exports = async () => {
  require('./env.js')()

  await Orm.connect()
  await Orm.importModels()
  await Orm.sync()
}