// Framework Modules
import Message from '../Message'

// Necessary parts
import Config from '../Config' // Generic class of configations
import dictionary from './dictionary' // Generic class of configations

// Server Settings Interface
import { ServerConfig as ServerConfigType, } from './types'

/** AtlasJS Server Module */
class ServerConfig extends Config {
  constructor () {
    super()

    // Set the default settings
    this.setDefaults({
      port: 3000,
      urlencoded: { extended: false, },
      callback: () => {
        return Message.success('listingOnPort', dictionary, {
          bind: { PORT: this.get('port')},
          format: [ 'bold', ]
        })
      },
      middleware: (req, res, next) => next(),
    } as ServerConfigType)
  }
}

export default new ServerConfig()