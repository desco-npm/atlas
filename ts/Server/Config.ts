/* Configurações do servidor */

// Módulos do framework
import Message from '../Message'

// Partes necessárias
import Config from '../Config' // Classe genérica de configuações
import dictionary from './dictionary' // Classe genérica de configuações

// Interface das configurações do servidor
import { IServerConfig, } from './types'

class ServerConfig extends Config {
  constructor () {
    super()

    // Seta as configurações padrões
    this.setDefaults({
      port: 3000,
      queryString: { extended: false, },
      callback: () => {
        return Message.success('listingOnPort', dictionary, { bind: { PORT: this.get('port')} })
      },
    } as IServerConfig)
  }
}

export default new ServerConfig()