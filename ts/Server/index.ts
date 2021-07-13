// Framework resources
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

// Necessary parts
import ServerConfig from './Config'
import { OptionsUrlencoded, OptionsJson } from 'body-parser' 
import * as ExpressCore from 'express-serve-static-core';

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

/** Parameters of a preRoute */
export interface IServerPreRouterParams { 
  /** Express application */
  Express: ExpressCore.Express,
};

/** Server Settings Type */
export interface IServerConfig { 
  /** Door where to run the server */
  port?: number,
  /** Function to be performed when you start the server */
  callback?: () => void,
  /** Request URL Encoded Options */
  queryString?: OptionsUrlencoded,
  /** Requisition Body Data Encodes Options, */
  body?: OptionsJson,
  /** Router function */
  router: (params: IServerRouterParams) => void
};

/** Parameters of a route */
export interface IServerRouterParams { 
  /** Express application */
  Express: ExpressCore.Express,
};

export default new Server()