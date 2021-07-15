// Framework resources
import { createConnection, } from '../lib/TypeORM'

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

  /** Prepares the ORM */
  private prepare (): void {
    console.log(this.Config.get('connection'))
  }

  /** Starts the ORM */
  start (): void {
    // Prepares the ORM
    this.prepare()
  }
}

export default new ORM()