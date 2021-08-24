import { OptionsUrlencoded, OptionsJson } from 'body-parser' 
import * as ExpressCore from 'express-serve-static-core';

/** Parameters of a preRoute */
export type ServerPreRouterParams = { 
  /** Express application */
  readonly Express: ExpressCore.Express,
}

/** Server Settings Type */
export type ServerConfig = { 
  /** Door where to run the server */
  readonly port?: number,
  /** Function to be performed when you start the server */
  readonly callback?: () => void,
  /** Request URL Encoded Options */
  readonly urlencoded?: OptionsUrlencoded,
  /** Requisition JSON Data Encodes Options, */
  readonly json?: OptionsJson,
  /** Router function */
  readonly router: ((params: ServerRouterParams) => void)[]
  /** Directory or directory list with static content */
  readonly staticDir: string | string[],
}

/** Parameters of a route */
export type ServerRouterParams = { 
  /** Express application */
  readonly Express: ExpressCore.Express,
}



/** Parameters of a Mixin route */
export type ServerRouterMiximParams = { 
  /** Entity */
  readonly entity: string,
  readonly connection?: string
}