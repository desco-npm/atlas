/* Server Types */

// Body-Parser package types that are used here
import { OptionsUrlencoded, OptionsJson } from 'body-parser' 

// Express package types that are used here
import * as ExpressCore from 'express-serve-static-core';

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