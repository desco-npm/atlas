module.exports = async ({ DataTypes, Orm,  }) => {
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
  }

  const mixins = []

  return Orm.addModel({ defs, opts, pos, mixins, })
}