// Framework resources
import appRootDir from './lib/appRootDir'
import path from './lib/path'

// Types
import { AtlasConfig } from './types'

// Framework Modules
import Message from './Message'
import Exception from './Exception'
import Server from './Server'

class Atlas {
  /** Directory of the project using AtlasJS */
  public projectDir = appRootDir.get()

  /** AtlasJS directory in use */
  public atlasDir = __dirname

  /** Default operating system directory separator in use */
  public pathSep = path.sep

  /**
   * Configure the AtlasJS
   * 
   * @param config Configures the AtlasJS
   **/
  config (Config: AtlasConfig): this {
    Message.config(Config.Message)
    Exception.config(Config.Exception)
    Server.config(Config.Server)

    return this
  }

  /** Prepare the AtlasJS */
  private prepare (): this {
    return this
  }

  /** Start AtlasJS */
  start (): void {
    this.prepare()

    Message.header()
    Server.start()
  }
}

export default new Atlas()