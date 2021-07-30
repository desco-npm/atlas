// Required parts
import Config from '../Config' //Generic class of configations

// Types
import { RESTConfig as RESTConfigType, } from './types'

/** AtlasJS REST Settings */
class RESTConfig extends Config {
  constructor () {
    super()

    // Set the default settings
    this.setDefaults({
      details: false,
    } as RESTConfigType)
  }
}

export default new RESTConfig