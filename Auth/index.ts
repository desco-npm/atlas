/**
 * TODO: Colocar Pattern de URL em método próprio pois esta repetido em dois métodos
 * TODO: Registro validar confirmação de senha
 * TODO: Atualização de senha validar confirmação de senha
 */

// Framework resources
import randomString from '../lib/randomString'
import replaceAll from '../lib/replaceAll'
import objectFilter from '../lib/objectFilter'
import jsonWebToken from '../lib/jsonWebToken'
import urlPattern from '../lib/urlPattern'
import inflection from '../lib/inflection'
import isArray from '../lib/isArray'
import moment from '../lib/moment'

// Framework Modules
import Server from '../Server'
import ORM from '../ORM'
import Mail from '../Mail'
import REST from '../REST'

// Types
import { AuthConfig as AuthConfig, } from './types'
import { ServerRouterParams, } from '../Server/types'
import { Connection, } from '../ORM/types'

// Necessary parts
import ModuleConfig from './Config'
import routes from './routes'
import dictionary from './dictionary'

/** Atlasjs Auth Module */
class Auth {
  /** Auth Settings */
  public Config = ModuleConfig

  /** Connection responsible for the Auth */
  public Connection: Connection | undefined

  /** Name of entity responsible for users */
  public entityName: string

  /** Name of entity responsible for resources */
  public resourceEntity: string

  /* Users Repository */
  public UserRepository: any

  /* Resource Repository */
  public ResourceRepository: any

  /**
   * Configures the Auth
   * 
   * @param config Configures the AtlasJS Auth Module
   */
  config (config: AuthConfig | undefined): this {
    // Set settings
    this.Config.set(config)

    return this
  }

  /** Prepares the Auth */
  async prepare (): Promise<void> {
    this.Connection = ORM.getConnection(ModuleConfig.get('connectionName'))
    this.entityName = ModuleConfig.get('entityName')
    this.resourceEntity = ModuleConfig.get('ACL.resource.entityName')
    this.UserRepository = this.Connection?.getRepository(this.entityName)
    this.ResourceRepository = this.Connection?.getRepository(this.resourceEntity)

    // Add middleware
    Server.Core.use(async (req, res, next): Promise<void> => {
      // If current resource is public
      const publicResource = await this.isPublicResource(req.url, req.method)

      // If the route is public, release
      if (publicResource) {
        next()

        return
      }

      // No token, returns error
      if (!req.headers.authorization) {
        REST.getError('ACCESS_WITHOUT_TOKEN', dictionary).catch(e => {
          res.status(401).json(e)
        })
        
        return
      }

      // Retrieve user by Token
      const user: any = await this.getUserByToken(req.headers.authorization)

      // If not found user, token is invalid. Inform
      if(!user) {
        REST.getError('ACCESS_INVALID_TOKEN', dictionary).catch(e => {
          res.status(403).json(e)
        })

        return
      }

      // If user does not have permission for the requested resource, inform
      if (!await this.resourcePermissionByUser(user, req.url, req.method)) {
        REST.getError('ACCESS_RESTRICT', dictionary).catch(e => {
          res.status(403).json(e)
        })

        return
      }

      req.headers.userData = user

      next()
    })

    // Add routes
    routes({ Express: Server.Core, } as ServerRouterParams)
  }

  /** Starts the Auth */
  async start (): Promise<void> {
  }

  /**
   * Register the user
   * 
   * @param data Object containing user data to be saved
   */
  async register (data: Object): Promise<Object> {
    // Retrieve settings
    const registerReturnProps = ModuleConfig.get('registerReturnProps')

    try {
      // User register
      var user = await this.UserRepository.save(data)
    }
    catch(e) {
      return REST.getError('USER_ALREADY_EXISTS', dictionary, { error: e, })
    }

    // Send the email
    await this.sendActiveCodeMail(user)

    // Filtering object to return only the desired data
    user = objectFilter(user, (v, k) => registerReturnProps.indexOf(k) !== -1)

    return user
  }

  /**
   * Send email with activation code
   * 
   * @param user Object containing user data
   */
  async sendActiveCodeMail (user: any): Promise<any> {
    // Retrieve settings
    const { login, activeCode, email, active, } = this.Config.get('prop')
    const { transporter, from, } = ModuleConfig.get('mail')
    const { subject, text, html, } = ModuleConfig.get('mail.activeCode')

    // If you don't have complete user object, search
    if(Object.keys(user).length === 1) {
      user = await this.UserRepository.findOne({ [login]: user[login], })
    }

    // If you don't find the user, it returns an error
    if(!user) {
      return REST.getError('SEND_ACTIVE_USER_NOT_FOUND', dictionary, {})
    }

    // If user is already active, ends with error
    if(user[active]) {
      return REST.getError('SEND_ACTIVE_ALREADY_ACTIVE_USER', dictionary, {})
    }

    // Generate code
    user[activeCode] = this.generateCode()

    // Save code
    user = await this.UserRepository.save(user)

    // Send mail
    await Mail.transporter(transporter)?.sendMail({
      from: from.name ? `${from.name} <${from.mail}>` : from.mail,
      to: user[email],
      subject,
      text: replaceAll(text, '[[CODE]]', user[activeCode]),
      html: replaceAll(html, '[[CODE]]', user[activeCode]),
    })
  }
  
  /**
   * Activates a user given the correct activation code
   * 
   * @param user User data to be active
   */
  async active (user: any): Promise<any> {
    // Retrieve settings
    const { active, activeCode, email, } = this.Config.get('prop')

    // User search
    user = await this.UserRepository.findOne({
      [email]: user[email],
      [activeCode]: user[activeCode]
    })

    // If there was an error, reject
    if(!user) {
      return REST.getError('ACTIVE_USER_NOT_FOUND', dictionary, {})
    }

    // Erase code and activate account
    user[activeCode] = null
    user[active] = true

    try {
      // Save changes
      user = await this.UserRepository.save(user)
    }
    catch(e) {
      return REST.getError('ACTIVE_USER_ERROR', dictionary, { error: e, })
    }

    // Log in and return
    return this.login(user)
  }

  /**
   * Send password recovery email
   * 
   * @param user User data to have password recovered
   */
  async sendRefreshPasswordCode (user: any): Promise<any> {
    // Retrieve settings
    const { email, refreshPasswordCode, } = this.Config.get('prop')
    const sendRefreshPasswordCodeReturnProps = this.Config.get('sendRefreshPasswordCodeReturnProps')

    // user search
    user = await this.UserRepository.findOne({ [email]: user[email], })

    // If you don't find the user, it returns an error
    if(!user) {
      return REST.getError('SEND_PASSWORD_RECOVER_USER_NOT_FOUND', dictionary, {})
    }

    /** Generate recover password code */
    user[refreshPasswordCode] = this.generateCode()

    // Save password recovery code
    try {
      await this.UserRepository.save(user)
    }
    catch(e) {
      return REST.getError('SEND_PASSWORD_RECOVER_SAVE_ERROR', dictionary, { error: e, })
    }

    // Recovers data from the email to be sent
    const { transporter, from, } = ModuleConfig.get('mail')
    const refreshPasswordCodeMail = ModuleConfig.get('mail.refreshPasswordCode')
    const { subject, text, html, } = refreshPasswordCodeMail

    // Send mail
    await Mail.transporter(transporter)?.sendMail({
      from: from.name ? `${from.name} <${from.mail}>` : from.mail,
      to: user[email],
      subject,
      text: replaceAll(text, '[[CODE]]', user[refreshPasswordCode]),
      html: replaceAll(html, '[[CODE]]', user[refreshPasswordCode]),
    })

    return objectFilter(user, (v, k) => sendRefreshPasswordCodeReturnProps.indexOf(k) !== -1)
  }

  /**
   * Authenticate a user
   * 
   * @param user User data to have password recovered
   */
  async login (user: any): Promise<any> {
     // Retrieve settings
     const loginReturnProps = this.Config.get('loginReturnProps')
     const loginReturnTokenProps = this.Config.get('loginReturnTokenProps')
     const { login, password, token, active, } = this.Config.get('prop')
     const { key, algorithm, } = this.Config.get('hash')
     
     // Search the user
     const bdUser = await this.UserRepository.findOne({ [login]: user[login], })

    // If you don't find the user, it returns an error
    // If password doesn't match, return error
    if(!bdUser || bdUser[password] !== user[password]) {
      return REST.getError('LOGIN_INVALID_CREDENTIALS', dictionary, {})
    }

    // If user is not active, returns error
    if(!bdUser[active]) {
      return REST.getError('LOGIN_INACTIVE_USER', dictionary, {})
    }

    // Generate a token
    bdUser[token] = jsonWebToken.sign(
      {
        ...objectFilter(bdUser, (v, k) => loginReturnTokenProps.indexOf(k) !== -1),
        time: moment().format(),
      },
      key,
      { algorithm, }
    )

    // Save the token
    try {
      await this.UserRepository.save(bdUser)
    }
    catch (e) {
      return REST.getError('LOGIN_SAVE_TOKEN_ERROR', dictionary, { error: e, })
    }

    return objectFilter(bdUser, (v, k) => loginReturnProps.indexOf(k) !== -1)
  }

  /**
   * Update user password
   * 
   * @param user User data to be active
   */
  async refreshPassword (user: any): Promise<any> {
    // Retrieve settings
    const refreshPasswordReturnProps = this.Config.get('refreshPasswordReturnProps')
    const { refreshPasswordCode, email, password, token, } = this.Config.get('prop')

    // User search
    let bdUser = await this.UserRepository.findOne({ [email]: user[email], })

    // If there was an error, reject
    if(!bdUser || bdUser[refreshPasswordCode] !== user[refreshPasswordCode]) {
      return REST.getError('REFRESH_PASSWORD_INVALID_CODE', dictionary, {})
    }

    // Erase code and update password
    bdUser[refreshPasswordCode] = null
    bdUser[password] = user[password]

    // Save changes
    try {
      bdUser = await this.UserRepository.save(bdUser)
    }
    catch(e) {
      return REST.getError('REFRESH_PASSWORD_SAVE_ERROR', dictionary, { error: e, })
    }

    // Login
    const loginUser = await this.login(bdUser)

    // Get token
    bdUser[token] = loginUser[token] 

    // Filtering object to return only the desired data
    bdUser = objectFilter(bdUser, (v, k) => refreshPasswordReturnProps.indexOf(k) !== -1)

    return Promise.resolve(bdUser)
  }

  /**
   * Logs out the user
   * 
   * @param userToken the user's token
   */
  async logout (userToken: string | undefined): Promise<any> {
    // If not passed token, returns with error
    if (!userToken) {
      return REST.getError('LOGOUT_WITHOUT_TOKEN', dictionary, {})
    }

    // Retrieve settings
    const refreshPasswordReturnProps = this.Config.get('refreshPasswordReturnProps')
    const { refreshPasswordCode, email, password, token, } = this.Config.get('prop')

    // User search
    let user = await this.getUserByToken(userToken)

    // If there was an error, reject
    if(!user) {
      return REST.getError('LOGOUT_USER_NOT_FOUND', dictionary, {})
    }

    // Erase token
    user[token] = null

    // Save changes
    try {
      await this.UserRepository.save(user)
    }
    catch(e) {
      return REST.getError('LOGOUT_SAVE_ERROR', dictionary, { error: e, })
    }
  }

  /** Get user by Token */
  private getUserByToken (userToken: string | undefined): Promise<object> {
    /** Name of the property containing the token */
    const { token, } = this.Config.get('prop')

    /** Name of the userGroup entity in the relationship */
    const userGroupEntity = inflection.pluralize(this.Config.get('ACL.group.entityName'))

    // Search and return
    return this.UserRepository.findOne({
      where: { [token]: userToken?.split(' ')[1], },
      relations: [ userGroupEntity, ]
    })
  }

  /**
   * Returns if a resource is public
   * 
   * @param resource The name of the resource
   * @param method The method used in the resource
   */
   async isPublicResource (resource: string, method: string): Promise<boolean> {
     const publicGroupId = this.Config.get('publicGroup')

     return await this.resourcePermissionByUserGroup(resource, method, publicGroupId) === true
   }

  /**
   * Returns if a resource is released for a group
   * 
   * @param resourceName The name of the resource
   * @param method The method used in the resource
   * @param userGroupId Group id
   */
   async resourcePermissionByUserGroup (
    resourceName: string, method: string, userGroupId: string | string[]
    ): Promise<boolean | null> {
      // Name of the permission entity in the relationship
      const permissionEntity = inflection.pluralize(this.Config.get('ACL.permission.entityName'))

      // Name of the userGroup entity in the relationship
      const userGroupEntity = this.Config.get('ACL.group.entityName')

      // Release property name
      const allowProp = this.Config.get('ACL.permission.prop.allow')

      // turning id into array
      userGroupId = isArray(userGroupId) ? userGroupId : [ userGroupId, ] as string[]

      // Search for features and permissions
      const resources = (await this.ResourceRepository.find({
        where: {
          [this.Config.get('ACL.resource.prop.method')]: method,
        },
        relations: [ permissionEntity, `${permissionEntity}.${userGroupEntity}`],
      }))
        /** TODO: Aprender a mover a verificação de grupo para o método find do TypeORM */
        .filter(i => {
          return i[permissionEntity].filter(p => {
            return userGroupId.indexOf(p[userGroupEntity]?.id) !== -1
          }).length > 0
        })

      // Capture the appropriate resource
      const resource = resources.filter(i => {
        const url = new urlPattern(i.name)

        return url.match(resourceName) !== null
      })[0]

      // If you can't find permission, use the default
      if (!resource) {
        return null
      }
      // Capture release and restriction permissions
      const allow = resource[permissionEntity].filter(i => i[allowProp] === true).length > 0
      const deny = resource[permissionEntity].filter(i => i[allowProp] === false).length > 0
      
      // If denying, return true
      // Otherwise, if releasing, returns false
      // If nothing, return default null
      if (deny) return false
      else if (allow) return true
      else return null
   }

  /**
   * Returns if a resource is released for a user
   * 
   * @param user The user id
   * @param resourceName The name of the resource
   * @param method The method used in the resource
   */
   async resourcePermissionByUser (
    user: any, resourceName: string, method: string
    ): Promise<boolean | null> {
      /** Name of the user entity in the relationship */
      const userEntity = this.Config.get('entityName')

      /** Name of the userGroup entity in the relationship */
      const userGroupEntity = inflection.pluralize(this.Config.get('ACL.group.entityName'))

      // Name of the permission entity in the relationship
      const permissionEntity = inflection.pluralize(this.Config.get('ACL.permission.entityName'))

      // Release property name
      const allowProp = this.Config.get('ACL.permission.prop.allow')
      
      // Search for features and permissions
      const resources = (await this.ResourceRepository.find({
        where: {
          [this.Config.get('ACL.resource.prop.method')]: method,
        },
        relations: [ permissionEntity, `${permissionEntity}.${userEntity}`],
      }))
      
      /** TODO: Aprender a mover a verificação de usuario para o método find do TypeORM */
      const userResources = resources.filter(i => {
        return i[permissionEntity].filter(p => {
          return user.id === p[userEntity]?.id
        }).length > 0
      })
        
      // Capture the appropriate resource
      const userResource = userResources.filter(i => {
        const url = new urlPattern(i.name)

        return url.match(resourceName) !== null
      })[0]

      if (userResource) {
        // Capture release and restriction permissions
        const allow = userResource[permissionEntity].filter(i => i[allowProp] === true).length > 0
        const deny = userResource[permissionEntity].filter(i => i[allowProp] === false).length > 0
  
        // If denying, return true
        // Otherwise, if releasing, returns false
        // If nothing, return default null
        if (deny) return false
        else if (allow) return true
      }

      // Returns if you have permission in any of the groups
      return this.resourcePermissionByUserGroup(
        resourceName,
        method,
        user[userGroupEntity].map(i => i.id)
      )
    }

    /** Create and return a code */
    private generateCode (): string {
      return randomString(ModuleConfig.get('code.length'), ModuleConfig.get('code.type'))
    }
}

export default new Auth()