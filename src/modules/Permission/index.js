const sequelizePermissionResources = require('../../../../sequelize-permission-resources')

class Permission {
  constructor () {
  }

  async init () {
    const express = Atlas.Server.express()
    const User = Atlas.Orm.listModels()[process.env.Atlas.AUTH_USER_MODEL]
    const Group = Atlas.Orm.listModels()[process.env.Atlas.AUTH_GROUP_MODEL]
    const Permission = Atlas.Orm.listModels()[process.env.Atlas.AUTH_MODEL]
    const secret = process.env.Atlas.AUTH_SECRET
    const google = process.env.Atlas.GOOGLE_AUTH
    const algorithm = process.env.Atlas.AUTH_ALGORITHM
    const throughUserGroup = [ User.name, Group.name, ].sort().join('_')
    const pswProp = process.env.Atlas.AUTH_PSW_PROP
    const loginProp = process.env.Atlas.AUTH_LOGIN_PROP
    const tokenProp = process.env.Atlas.AUTH_TOKEN_PROP
    const tokenTypeProp = process.env.Atlas.AUTH_TOKEN_TYPE_PROP
    const userPkProp = process.env.Atlas.AUTH_USER_PK_PROP
    const expireTokenProp = process.env.Atlas.AUTH_EXPIRE_TOKEN_PROP

    Atlas.newEntity(throughUserGroup)

    sequelizePermissionResources({
      express,
      User,
      Group,
      Permission,
      secret,
      google,
      algorithm,
      pswProp,
      loginProp,
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