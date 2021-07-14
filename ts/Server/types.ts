import { OptionsUrlencoded, OptionsJson } from 'body-parser' 
import * as ExpressCore from 'express-serve-static-core';

/** Parameters of a preRoute */
export interface ServerPreRouterParams { 
  /** Express application */
  Express: ExpressCore.Express,
};

/** Server Settings Type */
export interface ServerConfig { 
  /** Door where to run the server */
  port?: number,
  /** Function to be performed when you start the server */
  callback?: () => void,
  /** Request URL Encoded Options */
  queryString?: OptionsUrlencoded,
  /** Requisition Body Data Encodes Options, */
  body?: OptionsJson,
  /** Router function */
  router: (params: ServerRouterParams) => void
};

/** Parameters of a route */
export interface ServerRouterParams { 
  /** Express application */
  Express: ExpressCore.Express,
};