// Necessary parts
import { DictionaryConfig, } from './Dictionary/types'
import { MessageConfig, } from './Message/types'
import { ExceptionConfig, } from './Exception/types'
import { MailConfig, } from './Mail/types'
import { AuthConfig, } from './Auth/types'
import { ServerConfig, } from './Server/types'
import { ORMConfig, } from './ORM/types'
import { RESTConfig, } from './REST/types'

/** AtlasJS Settings Type */
export type AtlasConfig = {
  /** AtlasJS Dictionary Module Settings */
  Dictionary?: DictionaryConfig,
  /** AtlasJS Message Module Settings */
  Message?: MessageConfig,
  /** AtlasJS Exception Module Settings */
  Exception?: ExceptionConfig,
  /** AtlasJS Auth Module Settings */
  Auth?: AuthConfig,
  /** AtlasJS Mail Module Settings */
  Mail?: MailConfig,
  /** AtlasJS Server Module Settings */
  Server?: ServerConfig,
  /** AtlasJS ORM Module Settings */
  ORM?: ORMConfig,
  /** AtlasJS REST Module Settings */
  REST?: RESTConfig,
}

// Exporting types from other modules
export * from './Dictionary/types'
export * from './Message/types'
export * from './Exception/types'
export * from './Auth/types'
export * from './Mail/types'
export * from './Server/types'
export * from './ORM/types'
export * from './REST/types'