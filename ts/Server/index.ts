/* O servidor */

// Módulos de terceiros
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

// Partes necessárias
import ServerConfig from './Config'
import { IServerConfig, } from './types'

// A classe de servidor
class Server {
  Core = express() // O coração do servidor (Express)
  Config = ServerConfig // As configurações do servidor

  // Configura o servidor
  config (config: IServerConfig): this {
    // Seta as configurações
    this.Config.set(config)

    return this
  }

  // Prepara o servidor
  prepare (): this {
    // Configure o core
    this.Core.use(cors()) // Trata o CORS
    this.Core.use(bodyParser.urlencoded(this.Config.get('queryString'))) // Reconhece QueryString
    this.Core.use(bodyParser.json(this.Config.get('body'))) // Reconhece Body

    return this
  }

  // Inicia o servidor
  start (): void {
    // Prepara o servidor
    this.prepare()

    // Fica escutando a porta
    this.Core.listen(this.Config.get('port'), this.Config.get('callback'))
  }
}

export default new Server()