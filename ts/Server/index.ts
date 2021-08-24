// Framework resources
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import isArray from '../lib/isArray'

// Types
import { ServerConfig, ServerRouterParams, } from './types'

// Necessary parts
import ModuleConfig from './Config'

/** Atlasjs Server Module */
class Server {
  /** The Heart of the Server (Express) */
  public Core = express()

  /** Server Settings */
  public Config = ModuleConfig

  /**
   * Configures the server
   * 
   * @param config Configures the AtlasJS Server Module
   */
  config (config: ServerConfig | undefined): this {
    // Set settings
    this.Config.set(config)

    // Configure the core
    this.Core.use(cors()) // Treat the CORS
    this.Core.use(bodyParser.urlencoded(this.Config.get('urlencoded'))) // Recognize URL Encoded
    this.Core.use(bodyParser.json(this.Config.get('json'))) // Recognize JSON

    /** Directory or directory list with static content */
    let staticDir = this.Config.get('staticDir')

    // If you have static directories, define them
    if (staticDir) {
      staticDir = !isArray(staticDir) ? [ staticDir, ] : staticDir
      staticDir.map(d => this.Core.use(express.static(d)))
    }

    return this
  }

  /** Prepares the server */
  async prepare (): Promise<void> {
    // Run all routers
    this.Config.get('router').map(router => {
      router(({ Express: this.Core, } as ServerRouterParams))
    })
  }

  /** Starts the server */
  async start (): Promise<void> {
    // Listening to the door
    this.Core.listen(this.Config.get('port'), this.Config.get('callback'))
  }
}

export default new Server()