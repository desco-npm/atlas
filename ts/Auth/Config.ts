// Framework Modules
import ORM from '../ORM'

// Necessary parts
import Config from '../Config' // Generic class of configations

// Auth Settings
import { AuthConfig as AuthConfigType, AuthMailConfig, AuthHashConfig, } from './types'

/** Config AtlasJS Auth Module */
class AuthConfig extends Config {
  constructor () {
    super()

    // Set the default settings
    this.setDefaults({
      registerReturnProps: [ 'email', ],
      loginReturnProps: [ 'email', 'token', 'active', ],
      loginReturnTokenProps: [ 'email', ],
      sendRefreshPasswordCodeReturnProps: [ 'email', ],
      refreshPasswordReturnProps: [ 'email', 'token', ],
      publicGroup: 'public',
      code: {
        length: 6,
        type: 'uppernumeric',
      },
      connectionName: ORM.defaultConnectionName,
      routes: {
        register: '/auth/register',
        login: '/auth/login',
        sendActiveCode: '/auth/send_active_code',
        active: '/auth/active',
        sendRefreshPasswordCode: '/auth/send_refresh_password_code',
        refreshPassword: '/auth/refresh_password',
        logout: '/auth/logout',
      },
      mail: {
        transporter: 'default',
        activeCode: {
          subject: 'Active Code',
          text: 'Your activation code is [[CODE]]',
          html: 'Your activation code is <b>[[CODE]]</b>',
        },
        refreshPasswordCode: {
          subject: 'Password Recovery Code',
          text: 'Your password recovery code is [[CODE]]',
          html: 'Your password recovery code is <b>[[CODE]]</b>',
        },
      } as Partial<AuthMailConfig>,
      hash: {
        algorithm: 'HS256',
      } as Partial<AuthHashConfig>,
      user: {
        entityName: 'User',
        prop: {
          login: 'email',
          email: 'email',
          password: 'password',
          refreshPasswordCode: 'refreshPasswordCode',
          active: 'active',
          activeCode: 'activeCode',
          token: 'token',
          tokenType: 'tipoToken',
          tokenValidate: 'tokenValidate',
        },
      },
      ACL: {
        group: {
          entityName: 'UserGroup',
          prop: {
            name: 'name'
          }
        },
        permission: {
          entityName: 'Permission',
          prop: {
            allow: 'allow',
          },
        },
        resource: {
          entityName: 'Resource',
          prop: {
            method: 'method',
            name: 'name',
          }
        }
      },
    } as Partial<AuthConfigType>)
  }
}

export default new AuthConfig()