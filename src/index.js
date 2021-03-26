//TODO: DiscordBot - https://trello.com/c/iK7f9pRi/31-discordbot
//TODO: HTTPS - https://trello.com/c/qrJqWZCi/44-https

require('./globals')
require('./functions')

const cliHeader = _envRequire('@desco/cli-header')

class Atlas {
  constructor () {
    global.Atlas = this

    this.Mail = require('./modules/Mail')
    this.Orm = require('./modules/ORM')
    this.Server = require('./modules/Server')
    this.Permission = require('./modules/Permission')
  }

  async init (config = {}) {
    cliHeader({
      title: 'AtlasJS v' + require('../package.json').version,
      size: 25,
      align: 'center',
    })

    require('./env.js')(config)

    await this.Mail.init()
    await this.Orm.init()
    await this.Permission.init()
    await this.Server.init()

    await this.Orm.start()
    await this.Server.start()

    return this
  }

  newEntity (name) {
    this.Server.loadRouteByEntity(name)

    return this.Orm.addModel({ name, })
  }
}

module.exports = async config => {
  return new Atlas().init(config)
}