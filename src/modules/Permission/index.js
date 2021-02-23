const sequelizePermissionResources = _envRequire('@desco/sequelize-permission-resources')

class Permission {
  constructor () {
  }

  async init () {
    if (!process.env.Atlas.PERMISSION) return Promise.resolve()

    const User = Atlas.Orm.listModels()[process.env.Atlas.AUTH_USER_MODEL]
    const Group = Atlas.Orm.listModels()[process.env.Atlas.AUTH_GROUP_MODEL]
    const Permission = Atlas.Orm.listModels()[process.env.Atlas.AUTH_MODEL]

    if (!User || !Group || !Permission) {
      console.log('Permission: will not be executed because one or more of the following models have not been defined: User, Group or Permission.')

      return Promise.resolve()
    }

    const express = Atlas.Server.express()
    const op = Atlas.Orm.Op()
    const secret = process.env.Atlas.AUTH_SECRET
    const google = process.env.Atlas.GOOGLE_AUTH
    const googleId = process.env.Atlas.GOOGLE_AUTH_ID
    const googleKey = process.env.Atlas.GOOGLE_AUTH_KEY
    const googleScope = process.env.Atlas.GOOGLE_AUTH_SCOPE
    const googlePrompt = process.env.Atlas.GOOGLE_AUTH_PROMPT
    const algorithm = process.env.Atlas.AUTH_ALGORITHM
    const throughUserGroup = [ User.name, Group.name, ].sort().join('_')
    const pswProp = process.env.Atlas.AUTH_PSW_PROP
    const loginProp = process.env.Atlas.AUTH_LOGIN_PROP
    const mailProp = process.env.Atlas.AUTH_MAIL_PROP
    const tokenProp = process.env.Atlas.AUTH_TOKEN_PROP
    const tokenTypeProp = process.env.Atlas.AUTH_TOKEN_TYPE_PROP
    const userPkProp = process.env.Atlas.AUTH_USER_PK_PROP
    const expireTokenProp = process.env.Atlas.AUTH_EXPIRE_TOKEN_PROP

    await Atlas.newEntity(throughUserGroup)

    sequelizePermissionResources({
      express,
      op,
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
      expireTokenProp,
    })

    return Promise.resolve()
  }

  async start () {
    return Promise.resolve()
  }
}

module.exports = new Permission()