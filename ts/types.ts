// Necessary parts
import { MessageConfig, } from './Message/types'
import { ExceptionConfig, } from './Exception/types'
import { ServerConfig, } from './Server/types'
import { ORMConfig, } from './ORM/types'

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
  /** AtlasJS ORM Module Settings */
  ORM?: ORMConfig
}

// Exporting types from other modules
export { MessageConfig, Dictionary, MessageColorType, } from './Message/types'
export { ExceptionConfig, } from './Exception/types'
export { ServerConfig, ServerRouterParams, ServerPreRouterParams, } from './Server/types'
export { ORMConfig, } from './ORM/types'