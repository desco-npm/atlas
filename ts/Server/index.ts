// Framework resources
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

// Necessary parts
import ServerConfig from './Config'
import { IServerConfig, IServerRouterParams, } from './types'
/** Atlasjs Server Module */
class Server {
  /** The Heart of the Server (Express) */
  public Core = express()

  /** Server Settings */
  public Config = ServerConfig

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
  private prepare (): void {
    // configure the core
    this.Core.use(cors()) // Treat the CORS
    this.Core.use(bodyParser.urlencoded(this.Config.get('queryString'))) // Recognize QueryString
    this.Core.use(bodyParser.json(this.Config.get('body'))) // Recognize Body

    this.Config.get('router')({ Express: this.Core, } as IServerRouterParams)
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