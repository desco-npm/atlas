// Other types
import { Contact, } from '../Mail/types'

/** Format of activation codes and password recovery */
export type AuthCodeConfig = {
  /** Code size */
  length?: number,
  /** Code type */
  type?: (
    'alphanumeric' | 'numeric' | 'upper' | 'lower' | 'uppernumeric' | 'lowernumeric' | string
  ),
}

/** Names of the properties of the entity responsible for the users */
export type AuthPropConfig = {
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

/** Auth Encryption Hash Settings */
export type AuthHashConfig = {
  /** Hash Key/Secret */
  key: string,
  /** Algorism to be used in the Hash */
  algorithm?: string,
}

/** Auth ACL Group Props Settings */
export type AuthACLGroupPropConfig = {
  name?: string,
}

/** Auth ACL Group Settings */
export type AuthACLGroupConfig = {
  entityName?: string,
  prop?: AuthACLGroupPropConfig,
}

/** Auth ACL User Props Settings */
export type AuthACLPermissionPropConfig = {
  allow: string,
}

/** Auth ACL User Settings */
export type AuthACLPermissionConfig = {
  entityName?: string,
  prop?: AuthACLPermissionPropConfig,
}

/** Auth ACL Resource Props Settings */
export type AuthACLResourcePropConfig = {
  name: string,
  method: string,
}

/** Auth ACL Resource Settings */
export type AuthACLResourceConfig = {
  entityName?: string,
  prop?: AuthACLResourcePropConfig,
}

/** Auth ACL Settings */
export type AuthACLConfig = {
  group?: AuthACLGroupConfig,
  permission?: AuthACLPermissionConfig,
  resource?: AuthACLResourceConfig,
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
  /** Name of the entity responsible for the users */
  entityName: string,
  /** Names of the properties of the entity responsible for the users */
  prop?: AuthPropConfig,
  /** Names of routes responsible for authentication */
  routes?: AuthRoutesConfig,
  /** Data from emails to be sent by Auth */
  mail: AuthMailConfig,
  /** Auth Encryption Hash Settings */
  hash: AuthHashConfig,
  /** ACL Settings */
  ACL?: AuthACLConfig,
  /** Default group for unauthenticated users */
  publicGroup?: string,
}