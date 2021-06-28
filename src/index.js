const configEnvRequire = require('@desco/env-require')

const dynamicImports = require('./dynamicImports')

global.atlas_envRequire = configEnvRequire(dynamicImports, 'atlas')

configEnvRequire(dynamicImports, 'atlas')

require('./globals')
require('./functions')

const cliHeader = global.atlas_envRequire('@desco/cli-header', 'atlas')

class Atlas {
  constructor(config, env) {
    this.Config = require('./modules/Config')(config, env)

    global.Atlas = this

    this.Mail = require('./modules/Mail')
    this.Orm = require('./modules/ORM')
    this.Server = require('./modules/Server')
    this.Permission = require('./modules/Permission')
  }

  async init () {
    cliHeader({
      title: 'AtlasJS v' + require('../package.json').version,
      size: 25,
      align: 'center',
    })

    await this.Mail.init()
    await this.Orm.init()
    await this.Server.init()
    await this.Permission.init()

    await this.Orm.start()
    await this.Permission.start()
    await this.Server.start()

    return this
  }

  newEntity (name) {
    this.Server.loadRouteByEntity(name)

    return this.Orm.addModel({ name, })
  }
}

module.exports = async (config, env) => {
  return new Atlas(config, env).init()
}