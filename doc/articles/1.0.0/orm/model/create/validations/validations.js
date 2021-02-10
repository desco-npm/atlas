module.exports = {
  name: "User.js",
  lang: 'js',
  content: `
module.exports = ({ DataTypes, Orm, }) => {
  const attrs = {
    mail: {
      type: DataTypes.STRING(100),
      allowNul: false,
      validate: {
        isNull: false,
        notEmpty: true,
        isEmail: true,
        len: 100,
      },
    },
    password: {
      type: DataTypes.STRING(32),
      allowNul: false,
      validate: {
        isNull: false,
        notEmpty: true,
        len: 32,
      },
    },
    birthday: {
      type: DataTypes.DATE(),
      allowNul: false,
      validate: {
        isNull: false,
        notEmpty: true,
        isDate: true,
      },
    },
    block: {
      type: DataTypes.BOOLEAN(),
      allowNul: false,
      defaultValue: false,
      validate: {
        isNull: false,
        notEmpty: true,
        isIn: [ [ 0, 1, ], ],
      },
    }
  },

  const opts = {}

  const pos = ({ Model, models, }) => {}

  const mixins = []

  return Orm.addModel({ attrs, opts, pos, mixins, })
}
  `,
}