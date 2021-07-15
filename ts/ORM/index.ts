// Types
import { ORMConfig, } from './types'

// Necessary parts
import ModuleConfig from './Config'

class ORM {
  /** Message settings */
  protected Config = ModuleConfig

  /**
   * Configures the AtlasJS Message Module
   * 
   * @param config Configures the AtlasJS Message Module
   **/
  config (config: ORMConfig | undefined): this {
    // Arrow settings
    this.Config.set(config)

    return this
  }
}

export default new ORM()