const sequelizePermissionResources = _envRequire('@desco/sequelize-permission-resources')

class Permission {
  constructor () {
  }

  async init() {
    if (!process.env.Atlas.Auth.permission) return Promise.resolve()

    const User = Atlas.Orm.listModels()[process.env.Atlas.Auth.userModel]
    const Group = Atlas.Orm.listModels()[process.env.Atlas.Auth.groupModel]
    const Permission = Atlas.Orm.listModels()[process.env.Atlas.Auth.model]

    if (!User || !Group || !Permission) {
      console.log('Permission: will not be executed because one or more of the following models have not been defined: User, Group or Permission.')

      return Promise.resolve()
    }

    const express = Atlas.Server.express()
    const op = Atlas.Orm.Op()
    const secret = process.env.Atlas.Auth.secret
    const google = process.env.Atlas.Auth.Google.auth
    const googleId = process.env.Atlas.Auth.Google.authId
    const googleKey = process.env.Atlas.Auth.Google.authKey
    const googleScope = process.env.Atlas.Auth.Google.authScope
    const googlePrompt = process.env.Atlas.Auth.Google.authPrompt
    const algorithm = process.env.Atlas.Auth.algorithm
    const pswProp = process.env.Atlas.Auth.pswProp
    const loginProp = process.env.Atlas.Auth.loginProp
    const mailProp = process.env.Atlas.Auth.mailProp
    const tokenProp = process.env.Atlas.Auth.tokenProp
    const tokenTypeProp = process.env.Atlas.Auth.tokenTypeProp
    const userPkProp = process.env.Atlas.Auth.userPkProp
    const groupPkProp = process.env.Atlas.Auth.groupPkProp
    const expireTokenProp = process.env.Atlas.Auth.expireTokenProp
    const resourceProp = process.env.Atlas.Auth.resourceProp
    const allowProp = process.env.Atlas.Auth.allowProp
    const urlLogin = process.env.Atlas.Auth.urlLogin

    sequelizePermissionResources({
      express,
      op,
      urlLogin,
      User,
      Group,
      Permission,
      secret,
      google,
      googleId,
      googleKey,
      googleScope,
      googlePrompt,
      algorithm,
      pswProp,
      loginProp,
      mailProp,
      tokenProp,
      tokenTypeProp,
      userPkProp,
      groupPkProp,
      expireTokenProp,
      resourceProp,
      allowProp,
    })

    return Promise.resolve()
  }

  async start () {
    return Promise.resolve()
  }
}

module.exports = new Permission()