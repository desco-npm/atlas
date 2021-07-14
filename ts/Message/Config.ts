// Required parts
import Config from '../Config' //Generic class of configations

// Config Interface
import { MessageConfig, } from './'

/** AtlasJS Message Settings */
class ServerConfig extends Config {
  constructor () {
    super()

    // Set the default settings
    this.setDefaults({
      lang: 'en',
      tab: 0,
    } as MessageConfig)
  }
}

export default new ServerConfig()