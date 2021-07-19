// Framework resources
import appRootDir from './lib/appRootDir'
import path from './lib/path'

// Types
import { AtlasConfig } from './types'

// Framework Modules
import Message from './Message'
import Exception from './Exception'
import Mail from './Mail'
import Server from './Server'
import ORM from './ORM'

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

    if (Config.Mail) {
      Mail.config(Config.Mail)
    }

    if (Config.ORM) {
      ORM.config(Config.ORM)
    }

    if (Config.Server) {
      Server.config(Config.Server)
    }

    return this
  }

  /** Prepare the AtlasJS */
  private prepare (): this {
    return this
  }

  /** Start AtlasJS */
  async start (): Promise<void> {
    this.prepare()

    Message.header()

    if (Mail.Config.configured) {
      await Mail.start()
    }

    if (ORM.Config.configured) {
      await ORM.start()
    }

    if (Server.Config.configured) {
      await Server.start()
    }
  }
}

export default new Atlas()