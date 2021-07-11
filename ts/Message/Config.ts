/* Configurações do servidor */

// Partes necessárias
import Config from '../Config' // Classe genérica de configuações

// Interface das condifurações do servidor
import { IMessageConfig, } from './types'

class ServerConfig extends Config {
  constructor () {
    super()

    // Seta as configurações padrões
    this.setDefaults({
      lang: 'en',
      tab: 0,
    } as IMessageConfig)
  }
}

export default new ServerConfig()