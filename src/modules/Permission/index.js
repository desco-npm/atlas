const sequelizePermissionResources = require('../../../../sequelize-permission-resources')

class Permission {
  constructor () {
  }

  async init () {
    const express = Atlas.Server.express()
    const User = Atlas.Orm.listModels()[process.env.Atlas.PERMISSION_USER_MODEL]
    const Group = Atlas.Orm.listModels()[process.env.Atlas.PERMISSION_GROUP_MODEL]
    const Permission = Atlas.Orm.listModels()[process.env.Atlas.PERMISSION_MODEL]
    const secret = process.env.Atlas.AUTH_SECRET
    const google = process.env.Atlas.GOOGLE_AUTH
    const algorithm = process.env.Atlas.AUTH_ALGORITHM
    const throughUserGroup = [ User.name, Group.name, ].sort().join('_')

    Atlas.newEntity(throughUserGroup)

    sequelizePermissionResources({
      express,
      User,
      Group,
      Permission,
      secret,
      google,
      algorithm,
    })

    return Promise.resolve()
  }

  async start () {
    return Promise.resolve()
  }
}

module.exports = new Permission()