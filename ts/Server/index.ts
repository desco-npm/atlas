// Framework resources
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import readDir from '../lib/readDir'
import path from '../lib/path'
import mkdirIfNotExists from '../lib/mkdirIfNotExists'

// Framework Modules
import Atlas from '../'

// Necessary parts
import ServerConfig from './Config'
import { IServerConfig, } from './types'

/** Atlasjs Server Module */
class Server {
  /** The Heart of the Server (Express) */
  public Core = express()

  /** Server Settings */
  public Config = ServerConfig

  /** Routes directory */
  public routerDir = ''

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

    // Set dynamic properties
    this.routerDir = path.join(Atlas.projectDir, this.Config.get('routerDir'))

    this.loadRouters()
  }

  /** Load project routes */
  private loadRouters () {
    // Create route directory if it does not exist
    mkdirIfNotExists(this.routerDir)
    
    // List the routes
    const routers = readDir(this.routerDir)

    // Cycle through and execute all routes
    routers.map(routerName => {
      const router = require(path.join(this.routerDir, routerName)).default

      router({ Express: this.Core, entity: routerName.slice(0, -3), })
    })
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