// Required parts
import Config from '../Config' // Generic class of configations
import { ExceptionConfig as ExceptionConfigType, } from './types'

/** AtlasJS Exception Settings */
class ExceptionConfig extends Config {
  constructor () {
    super()

    // Set the default settings
    this.setDefaults({
    } as ExceptionConfigType)
  }
}

export default new ExceptionConfig()