// Required parts
import Config from '../Config' //Generic class of configations

// Types
import { MessageConfig as MessageConfigType, } from './types'

/** AtlasJS Message Settings */
class MessageConfig extends Config {
  constructor () {
    super()

    // Set the default settings
    this.setDefaults({
      tab: 0,
    } as MessageConfigType)
  }
}

export default new MessageConfig