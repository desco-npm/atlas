/** Types of Atlas */
import { IAtlasConfig, } from './types'

// Framework Modules
import Message from './Message'
import Server from './Server'

class Atlas {
  /**
   * Configure the AtlasJS
   * 
   * @param config Configures the AtlasJS
   **/
  config (Config: IAtlasConfig): this {
    Message.config(Config.Message)
    Server.config(Config.Server)

    return this
  }

  /**
   * Prepare the AtlasJS
   */
  private prepare (): this {
    return this
  }

  /**
   * Start AtlasJS
   */
  start (): void {
    // Prepara o Atlas
    this.prepare()

    Message.header()
    Server.start()
  }
}

export default new Atlas()