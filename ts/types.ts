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

// Exporting types from other modules
export { Dictionary, MessageColorType, MessageConfig } from './Message/types'
export { ExceptionConfig, } from './Exception/types'
export { ServerConfig, ServerRouterParams, ServerPreRouterParams, } from './Server/types'