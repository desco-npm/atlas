// Framework resources
import objectMap from '../lib/objectMap'
import replaceAll from '../lib/replaceAll'

// Types
import { DictionaryConfig as DictionaryConfigType, Dictionary as DictionaryType, } from './types'
import { DictionaryGetOptions } from './types'

// Necessary parts
import DictionaryConfig from './Config'

/** AtlasJS Dictionary Module */
class Dictionary {
  /** Dictionary settings */
  protected Config = DictionaryConfig

  /**
   * Configures the AtlasJS Dictionary Module
   * 
   * @param config Configures the AtlasJS Dictionary Module
   **/
  config (config: DictionaryConfigType | undefined): this {
    // Arrow settings
    this.Config.set(config)

    return this
  }

  /**
   * Get content
   * 
   * @param id Content id in Module Dictionary
   * @param dictionary Module Message Dictionary
   * @param options Extra options
   **/
  get (id: string, dictionary: DictionaryType, options?: DictionaryGetOptions): String {
    let text = dictionary[this.Config.get('lang')][id]

    // Exchange variables by informed values
    objectMap(options?.bind || {}, (replaceThis, withThis) => {
      text = replaceAll(text, `[[${withThis}]]`, replaceThis)
    })

    return text
  }
}

export default new Dictionary()