/* O AtlasJS */

// Tipos do Atlas
import { IAtlasConfig, } from './types'

// Módulos do framework
import Message from './Message'
import Server from './Server'

class Atlas {
  // Configura o Atlas
  config (Config: IAtlasConfig): this {
    Server.config(Config.Server)

    return this
  }

  // Prepara o Atlas
  private prepare (): this {
    return this
  }

  // Inicia o servidor
  start (): void {
    // Prepara o Atlas
    this.prepare()

    Message.header()
    Server.start()
  }
}

export default new Atlas()