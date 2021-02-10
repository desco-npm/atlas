module.exports = {
  name: "User.js",
  lang: 'js',
  content: `
module.exports = ({ DataTypes, Orm, }) => {
  const attrs = {
    mail: {
      type: DataTypes.STRING(100),
      allowNul: false,
    },
    password: {
      type: DataTypes.STRING(32),
      allowNul: false,
    },
    birthday: {
      type: DataTypes.DATE(),
      allowNul: false,
    },
    block: {
      type: DataTypes.BOOLEAN(),
      allowNul: false,
      defaultValue: false,
    }
  },

  const opts = {}

  const pos = ({ Model, models, }) => {}

  const mixins = []

  return Orm.addModel({ attrs, opts, pos, mixins, })
}
  `,
}