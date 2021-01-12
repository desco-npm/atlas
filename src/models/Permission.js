
const userModel = process.env.Atlas.PERMISSION_USER_MODEL

module.exports = async ({ DataTypes, Orm, }) => {
  const defs = {
    resource: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    allow: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    }
  }

  const opts = {}

  const pos = ({ Model, models, }) => {
    Model.belongsTo(models[process.env.Atlas.PERMISSION_USER_MODEL])
    Model.belongsTo(models[process.env.Atlas.PERMISSION_GROUP_MODEL])
  }

  const mixins = {
    Permission: {
      router ({ express, entity, }) {
        express.get(`/${entity}/${userModel}/:id`, async (req, res) => {
          res.json(await this.userPermission(req.params.id))
        })
      },
      userPermission (id) {
        return this.select({
          where: {
            [`${userModel}Id`]: id,
          }
        })
      }
    }
  }

  return Orm.addModel({ defs, opts, pos, mixins, })
}