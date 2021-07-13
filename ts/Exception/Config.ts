// Required parts
import Config from '../Config' // Generic class of configations
import { IExceptionConfig, } from './'

/** AtlasJS Exception Settings */
class ExceptionConfig extends Config {
  constructor () {
    super()

    // Set the default settings
    this.setDefaults({
    } as IExceptionConfig)
  }
}

export default new ExceptionConfig()