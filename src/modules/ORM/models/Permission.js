module.exports = async ({ DataTypes, Orm,  }) => {
  const attrs = {
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

  return Orm.addModel({ attrs, opts, pos, mixins, })
}