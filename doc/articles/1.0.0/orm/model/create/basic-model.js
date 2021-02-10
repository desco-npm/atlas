module.exports = {
  name: "User.js",
  lang: 'js',
  content: `
module.exports = ({ DataTypes, Orm, }) => {
  const attrs = {},

  const opts = {}

  const pos = ({ Model, models, }) => {}

  const mixins = []

  return Orm.addModel({ attrs, opts, pos, mixins, })
}
  `,
}