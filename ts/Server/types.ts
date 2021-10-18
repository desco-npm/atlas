import { OptionsUrlencoded, OptionsJson } from 'body-parser' 
import * as ExpressCore from 'express-serve-static-core';
import { Request, Response, } from 'express-serve-static-core'

/** Parameters of a preRoute */
export type ServerPreRouterParams = { 
  /** Express application */
  readonly Express: ExpressCore.Express,
}

/** RouterFunction Type */
export type RouterFunction = (params: ServerRouterParams) => void

/** MiddlewareFunction Type */
export type MiddlewareFunction = (req: Request, res: Response, next: Function) => void

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
  readonly router: RouterFunction[]
  /** Directory or directory list with static content */
  readonly staticDir: string | string[],
  /** The middlewares */
  readonly middleware?: MiddlewareFunction | MiddlewareFunction[] | []
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

export { Request, Response, } from 'express-serve-static-core';