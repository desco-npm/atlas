// Necessary parts
import { IMessageConfig, } from './Message/types'
import { IExceptionConfig, } from './Exception/types'
import { IServerConfig, } from './Server/types'

/**
 * AtlasJS Settings Type
 */
export interface IAtlasConfig {
  Message?: IMessageConfig,
  Exception?: IExceptionConfig,
  Server?: IServerConfig
}