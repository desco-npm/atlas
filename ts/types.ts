// Necessary parts
import { IMessageConfig, } from './Message/types'
import { IExceptionConfig, } from './Exception/types'
import { IServerConfig, } from './Server/types'

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