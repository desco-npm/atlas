// Necessary parts
import { IMessageConfig, } from './Message/types'
import { IServerConfig, } from './Server/types'

/**
 * AtlasJS Settings Type
 */
export interface IAtlasConfig {
  Message?: IMessageConfig,
  Server?: IServerConfig
}