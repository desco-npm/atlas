// Framework resources
import randomString from '../lib/randomString'
import replaceAll from '../lib/replaceAll'
import objectFilter from '../lib/objectFilter'
import jsonWebToken from '../lib/jsonWebToken'

// Framework Modules
import Server from '../Server'
import ORM from '../ORM'
import Mail from '../Mail'
import REST from '../REST'

// Types
import { AuthConfig as AuthConfig, } from './types'
import { ServerRouterParams, } from '../Server/types'

// Necessary parts
import ModuleConfig from './Config'
import routes from './routes'
import dictionary from './dictionary'

/** Atlasjs Auth Module */
class Auth {
  /** Auth Settings */
  public Config = ModuleConfig

  /** Name of the entity responsible for the users */
  public connectionName: string

  /** Name of connection responsible for users */
  public entityName: string

  /* Users Repository */
  public UserRepository: any

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
    this.connectionName = ModuleConfig.get('connectionName')
    this.entityName = ModuleConfig.get('entityName')
    this.UserRepository = ORM.getConnection(this.connectionName)?.getRepository(this.entityName)

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
    const { activeCode, } = this.Config.get('prop')
    const registerReturnTokenProps = ModuleConfig.get('registerReturnTokenProps')
    
    /** Generate activation code */
    const code = randomString(ModuleConfig.get('code.length'), ModuleConfig.get('code.type'))
    
    // Add the code to the request body
    data[activeCode] = code

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
    user = objectFilter(user, (v, k) => registerReturnTokenProps.indexOf(k) !== -1)
    
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
    const activeReturnProps = this.Config.get('activeReturnProps')
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

    // Filtering object to return only the desired data
    user = objectFilter(user, (v, k) => activeReturnProps.indexOf(k) !== -1)

    return Promise.resolve(user)
  }

  /**
   * Send password recovery email
   * 
   * @param user User data to have password recovered
   */
  async sendRefreshPasswordCode (user: any): Promise<any> {
    // Retrieve settings
    const { email, refreshPasswordCode, } = this.Config.get('prop')

    // user search
    user = await this.UserRepository.findOne({ [email]: user[email], })

    // If you don't find the user, it returns an error
    if(!user) {
      return REST.getError('SEND_PASSWORD_RECOVER_USER_NOT_FOUND', dictionary, {})
    }

    /** Generate recover password code */
    user[refreshPasswordCode] = (
      randomString(ModuleConfig.get('code.length'), ModuleConfig.get('code.type'))
    )

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
      objectFilter(bdUser, (v, k) => loginReturnTokenProps.indexOf(k) !== -1),
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
    const { refreshPasswordCode, email, password, } = this.Config.get('prop')

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
      let user = await this.UserRepository.findOne({ [token]: userToken.split(' ')[1], })

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
}

export default new Auth()