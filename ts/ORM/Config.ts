// Required parts
import Config from '../Config' //Generic class of configations

// Types
import { ORMConfig as ORMConfigType, } from './types'

/** AtlasJS ORM Settings */
class ORMConfig extends Config {
  constructor () {
    super()

    // Set the default settings
    this.setDefaults({
    } as ORMConfigType)
  }
}

export default new ORMConfig()