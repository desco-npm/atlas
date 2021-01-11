const Orm = require('./ORM')

class Permission {
  constructor () {
  }

  init () {
    return Orm.importModels()
  }
}

module.exports = new Permission()