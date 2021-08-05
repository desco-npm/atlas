// Required parts
import Config from '../Config' //Generic class of configations

// Types
import { DictionaryConfig as DictionaryConfigType, } from './types'

/** AtlasJS Message Settings */
class DictionaryConfig extends Config {
  constructor () {
    super()

    // Set the default settings
    this.setDefaults({
      lang: 'en',
    } as DictionaryConfigType)
  }
}

export default new DictionaryConfig()