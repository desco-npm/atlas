/* Configurações do servidor */

// Partes necessárias
import Config from '../Config' // Classe genérica de configuações

// Interface das condifurações do servidor
import { IServerConfig, } from './types'

class ServerConfig extends Config {
  constructor () {
    super()

    // Seta as configurações padrões
    this.setDefaults({
      port: 3000,
      queryString: { extended: false, },
      callback: () => console.log(`Rodando na porta ${this.get('port')}`)
    } as IServerConfig)
  }
}

export default new ServerConfig()