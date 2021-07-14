// Necessary parts
import { MessageConfig, } from './Message/types'
import { ExceptionConfig, } from './Exception/types'
import { ServerConfig, } from './Server/types'

/**
 * AtlasJS Settings Type
 */
export type AtlasConfig = {
  /** AtlasJS Message Module Settings */
  Message?: MessageConfig,
  /** AtlasJS Exception Module Settings */
  Exception?: ExceptionConfig,
  /** AtlasJS Server Module Settings */
  Server?: ServerConfig
}