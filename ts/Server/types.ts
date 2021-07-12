/* Server Types */

// Body-Parser package types that are used here
import { OptionsUrlencoded, OptionsJson } from 'body-parser' 

/** Server Settings Type */
export interface IServerConfig { 
  port?: number, // Door where to run the server
  callback?: () => void, // Function to be performed when you start the server
  queryString?: OptionsUrlencoded // Request URL Encoded Options
  body?: OptionsJson // Requisition Body Data Encodes Options,
  routerDir?: string // Server routes directory
};