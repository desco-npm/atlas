const userModel = process.env.Atlas.PERMISSION_USER_MODEL
const userGroupModel = process.env.Atlas.PERMISSION_GROUP_MODEL
const User_UserGroup_Model = [ userModel, userGroupModel, ].sort().join('_')

module.exports = async ({ DataTypes, Orm, }) => {
  const defs = {
    resource: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    allow: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  }

  const opts = {}

  const pos = ({ Model, models, }) => {
    Model.belongsTo(models[process.env.Atlas.PERMISSION_USER_MODEL])
    Model.belongsTo(models[process.env.Atlas.PERMISSION_GROUP_MODEL])
  }

  const mixins = {
    Permission: ({ models, Op, }) => {
      return {
        router ({ express, entity, }) {
          express.get(`/${entity}/${userModel}/:id`, async (req, res) => {
            res.json(await this.userPermission(req.params.id))
          })
        },
        async userPermission (id) {
          const userGroups = (await models[User_UserGroup_Model].find({
            where: {
              [`${userModel}Id`]: id,
            },
          })).rows.map(i => i[`${userGroupModel}Id`])

          const permissionsList = (await this.select({
            where: {
              [Op.or]: {
                [`${userModel}Id`]: id,
                [`${userGroupModel}Id`]: {
                  [Op.in]: userGroups,
                },
              },
            },
          })).rows

          const permissions = {}

          permissionsList.map(permission => {
            const permissionInList = permissions[permission.resource] || {}

            const notPermission = !permissions[permission.resource]
            const permissionInListIsNull = permissionInList.allow === null
            const permissionListIsGroupAndCurrentIsUser = (
              permissionInList[`${userGroupModel}Id`] &&
              permission[`${userModel}Id`]
            )
            const permissionsIsUserAndCurrentIsFalse = (
              permissionInList[`${userModel}Id`] &&
              permission[`${userModel}Id`] &&
              permission['allow'] === false
            )
            const permissionsIsGroupAndCurrentIsFalse = (
              permissionInList[`${userGroupModel}Id`] &&
              permission[`${userGroupModel}Id`] &&
              permission['allow'] === false
            )

            if (
              notPermission || permissionInListIsNull || permissionListIsGroupAndCurrentIsUser ||
              permissionsIsUserAndCurrentIsFalse || permissionsIsGroupAndCurrentIsFalse
            ) {
              permissions[permission.resource] = permission
            }
          })

          return objectMap(permissions, permission => {
            return permission.allow || false
          })
        },
      }
    },
  }

  return Orm.addModel({ defs, opts, pos, mixins, })
}