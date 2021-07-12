// Framework resources
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import readDir from '../lib/readDir'

// Necessary parts
import ServerConfig from './Config'
import { IServerConfig, } from './types'

/** Atlasjs Server Module */
class Server {
  /** The Heart of the Server (Express) */
  protected Core = express()

  /** Server Settings */
  protected Config = ServerConfig

  /**
   * Configures the server
   * 
   * @param config Configures the AtlasJS Server Module
   */
  config (config: IServerConfig | undefined): this {
    // Set settings
    this.Config.set(config)

    return this
  }

  /** Prepares the server */
  private prepare (): this {
    // configure the core
    this.Core.use(cors()) // Trata o CORS
    this.Core.use(bodyParser.urlencoded(this.Config.get('queryString'))) // Reconhece QueryString
    this.Core.use(bodyParser.json(this.Config.get('body'))) // Reconhece Body

    return this
  }

  /** Starts the server */
  start (): void {
    // Prepares the server
    this.prepare()

    // Listening to the door
    this.Core.listen(this.Config.get('port'), this.Config.get('callback'))
  }
}

export default new Server()