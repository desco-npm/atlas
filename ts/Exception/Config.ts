// Required parts
import Config from '../Config' // Generic class of configations
import { ExceptionConfig, } from './'

/** AtlasJS Exception Settings */
class ExceptionConfig extends Config {
  constructor () {
    super()

    // Set the default settings
    this.setDefaults({
    } as ExceptionConfig)
  }
}

export default new ExceptionConfig()