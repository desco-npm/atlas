// Necessary parts
import { IMessageConfig, } from './Message'
import { IExceptionConfig, } from './Exception'
import { IServerConfig, } from './Server'

/**
 * AtlasJS Settings Type
 */
export interface IAtlasConfig {
  /** AtlasJS Message Module Settings */
  Message?: IMessageConfig,
  /** AtlasJS Exception Module Settings */
  Exception?: IExceptionConfig,
  /** AtlasJS Server Module Settings */
  Server?: IServerConfig
}