// Required parts
import Config from '../Config' //Generic class of configations

// Config Interface
import { IMessageConfig, } from './'

/** AtlasJS Message Settings */
class ServerConfig extends Config {
  constructor () {
    super()

    // Set the default settings
    this.setDefaults({
      lang: 'en',
      tab: 0,
    } as IMessageConfig)
  }
}

export default new ServerConfig()