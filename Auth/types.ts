// Other types
import { Contact, } from '../Mail/types'

/** Format of activation codes and password recovery */
export type AuthCodeConfig = {
  /** Code size */
  length?: Number,
  /** Code type */
  type?: (
    'alphanumeric' | 'numeric' | 'upper' | 'lower' | 'uppernumeric' | 'lowernumeric' | String
  ),
}

/** Names of the properties of the entity responsible for the users */
export type AuthPropConfig = {
  login?: String,
  email?: String,
  password?: String,
  token?: String,
  tokenValidate?: String,
  tokenType?: String,
  active?: String,
  activeCode?: String,
  refreshPasswordCode?: String,
}

/** Names of routes responsible for authentication */
export type AuthRoutesConfig = {
  register?: String,
  login?: String,
  sendActiveCode?: String,
  active?: String,
  sendRefreshPasswordCode?: String,
  refreshPassword?: String,
  logout?: String,
}

/** Data from emails to be sent by Auth */
export type AuthMailConfig = {
  /** Which carrier to use */
  transporter?: String,
  /* Sender */
  from: Contact,
  /** Account Activation Email */
  activeCode?: {
    /** Subject  */
    subject?: String,
    /** Content without HTML */
    text?: String,
    /** Content HTML */
    html?: String,
  }
  /** Account Activation Email */
  refreshPasswordCode?: {
    /** Subject  */
    subject?: String,
    /** Content without HTML */
    text?: String,
    /** Content HTML */
    html?: String,
  },
}

/** Auth Encryption Hash Settings */
export type AuthHashConfig = {
  /** Hash Key/Secret */
  key: String,
  /** Algorism to be used in the Hash */
  algorithm?: String,
}

/** Auth Settings Type */
export type AuthConfig = {
  /** Properties to be returned on register */
  registerReturnTokenProps?: String[],
  /** Properties to be returned on login */
  loginReturnProps?: String[],
  /** Properties to be returned on token login */
  loginReturnTokenProps?: String[],
  /** Properties to be returned on active */
  activeReturnProps?: String[],
  /** Properties to be returned on active */
  refreshPasswordReturnProps?: String[],
  /** Format of activation codes and password recovery */
  code?: AuthCodeConfig,
  /** Name of connection responsible for users */
  connectionName?: String,
  /** Name of the entity responsible for the users */
  entityName: String,
  /** Names of the properties of the entity responsible for the users */
  prop?: AuthPropConfig,
  /** Names of routes responsible for authentication */
  routes?: AuthRoutesConfig,
  /** Data from emails to be sent by Auth */
  mail: AuthMailConfig,
  /** Auth Encryption Hash Settings */
  hash: AuthHashConfig,
}