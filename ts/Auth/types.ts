// Other types
import { Contact, } from '../Mail/types'

/** Auth User Settings */
export type AuthUserConfig = {
  /** Name of the entity responsible for the users */
  entityName: string,
  /** Names of the properties of the entity responsible for the users */
  prop?: {
    login?: string,
    email?: string,
    password?: string,
    token?: string,
    tokenValidate?: string,
    tokenType?: string,
    active?: string,
    activeCode?: string,
    refreshPasswordCode?: string,
  }
}

/** Auth Group Settings */
export type AuthGroupConfig = {
  /** Name of the entity responsible for the groups */
  entityName?: string,
  /** Default group for unauthenticated users */
  publicId: string,
  /** Names of the properties of the entity responsible for the groups */
  prop?: {
    name?: string,
  }
}

/** Auth Permission Settings */
export type AuthPermissionConfig = {
  /** Name of the entity responsible for the permissions */
  entityName: string,
  /** Names of the properties of the entity responsible for the permissions */
  prop: {
    allow: string,
  }
}

/** Auth Resource Settings */
export type AuthResourceConfig = {
  /** Name of the entity responsible for the resources */
  entityName: string,
  /** Names of the properties of the entity responsible for the resources */
  prop: {
    name: string,
    method: string,
  }
}

/** Format of activation codes and password recovery */
export type AuthCodeConfig = {
  /** Code size */
  length?: number,
  /** Code type */
  type?: (
    'alphanumeric' | 'numeric' | 'upper' | 'lower' | 'uppernumeric' | 'lowernumeric' | string
  ),
}

/** Names of routes responsible for authentication */
export type AuthRoutesConfig = {
  register?: string,
  login?: string,
  sendActiveCode?: string,
  active?: string,
  sendRefreshPasswordCode?: string,
  refreshPassword?: string,
  logout?: string,
}

/** Data from emails to be sent by Auth */
export type AuthMailConfig = {
  /** Which carrier to use */
  transporter?: string,
  /* Sender */
  from: Contact,
  /** Account Activation Email */
  activeCode?: {
    /** Subject  */
    subject?: string,
    /** Content without HTML */
    text?: string,
    /** Content HTML */
    html?: string,
  }
  /** Account Activation Email */
  refreshPasswordCode?: {
    /** Subject  */
    subject?: string,
    /** Content without HTML */
    text?: string,
    /** Content HTML */
    html?: string,
  },
}

/** Auth Encryption Token Settings */
export type AuthTokenConfig = {
  /** Hash Key/Secret */
  key: string,
  /** Algorism to be used in the Hash */
  algorithm?: string,
}

/** Auth Settings Type */
export type AuthConfig = {
  /** Properties to be returned on register */
  registerReturnProps?: string[],
  /** Properties to be returned on login */
  loginReturnProps?: string[],
  /** Properties to be returned on token login */
  loginReturnTokenProps?: string[],
  /** Properties to be returned on send refresh password code */
  sendRefreshPasswordCodeReturnProps?: string[],
  /** Properties to be returned on active */
  refreshPasswordReturnProps?: string[],
  /** Format of activation codes and password recovery */
  code?: AuthCodeConfig,
  /** Name of connection responsible for users */
  connectionName?: string,
  /** Auth User Settings */
  user: AuthUserConfig,
  /** Auth Group Settings */
  group?: AuthGroupConfig,
  /** Auth Permission Settings */
  permission?: AuthPermissionConfig,
  /** Auth Resource Settings */
  resource?: AuthResourceConfig,
  /** Names of routes responsible for authentication */
  routes?: AuthRoutesConfig,
  /** Data from emails to be sent by Auth */
  mail: AuthMailConfig,
  /** Auth Encryption Token Settings */
  token: AuthTokenConfig,
  // The salt to be used to hash the password
  passwordSalt?: number,
}