// Framework Modules
import Dictionary from '../Dictionary'

// Framework resources
/* /--/ */

// Types
import { RESTConfig as RESTConfigType, RESTGetErrorOptions, RESTError, } from './types'
import { Dictionary as DictionaryType, DictionaryGetOptions } from '../Dictionary/types'

// Necessary parts
import ModuleConfig from './Config'

/** AtlasJS REST Module */
class REST {
  /** REST settings */
  protected Config = ModuleConfig

  /**
   * Configures the AtlasJS REST Module
   * 
   * @param config Configures the AtlasJS REST Module
   **/
  config (config: RESTConfigType | undefined): this {
    // Arrow settings
    this.Config.set(config)

    return this
  }

  /**
   * Returns an error response
   * 
   * @param id Message ID within the Dictionary of Module Messages
   * @param dictionary Module Message Dictionary
   * @param options Extra options
   */
  getError (
    id: string, dictionary: DictionaryType, options?: RESTGetErrorOptions
    ): Promise<RESTError> {
    // Retrieves message from the dictionary, according to the language defined in the settings
    const message = Dictionary.get(
      `REST_ERROR_${id}`, dictionary, { bind: options?.bind, } as DictionaryGetOptions
    )

    // The error
    return Promise.reject({
      statusCode : options?.statusCode || 500,
      errorId: id,
      message,
      details: this.Config.get('details') ? options?.error : undefined
    })
  }
}

export default new REST()