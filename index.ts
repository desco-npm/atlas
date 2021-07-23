// Framework resources
import appRootDir from './lib/appRootDir'
import path from './lib/path'

// Types
import { AtlasConfig } from './types'

// Framework Modules
import Dictionary from './Dictionary'
import Message from './Message'
import Exception from './Exception'
import Mail from './Mail'
import Auth from './Auth'
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
    Dictionary.config(Config.Dictionary)
    Message.config(Config.Message)
    Exception.config(Config.Exception)

    if(Config.Mail) {
      Mail.config(Config.Mail)
    }

    if(Config.ORM) {
      ORM.config(Config.ORM)
    }

    if(Config.Server) {
      Server.config(Config.Server)
    }

    if(Config.Auth) {
      Auth.config(Config.Auth)
    }

    return this
  }

  /** Prepare the AtlasJS */
  async prepare (): Promise<void> {
    if(Mail.Config.configured) {
      await Mail.prepare()
    }
    
    if(ORM.Config.configured) {
      await ORM.prepare()
    }
    
    if(Server.Config.configured) {
      await Server.prepare()
    }
    
    if(Auth.Config.configured) {
      await Auth.prepare()
    }
  }

  /** Start AtlasJS */
  async start (): Promise<void> {
    await this.prepare()

    Message.header()

    if(Mail.Config.configured) {
      await Mail.start()
    }
    
    if(Auth.Config.configured) {
      await Auth.start()
    }

    if(ORM.Config.configured) {
      await ORM.start()
    }

    if(Server.Config.configured) {
      await Server.start()
    }
  }
}

export default new Atlas()

export * from './types'