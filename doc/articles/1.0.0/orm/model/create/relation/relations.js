module.exports = {
  name: "User.js",
  lang: 'js',
  content: `
module.exports = ({ DataTypes, Orm, }) => {
  const attrs = {
     /* ... */
    }
  },

  const opts = {}

  const pos = ({ Model, models, }) => {
    Model.hasOne(models.Profile)
    Model.belongsTo(models.Guild) 
    Model.hasMany(models.Photo) 
    Model.belongsToMany(models.Group, { through: 'UserThroughGroup', }) 
  }

  const mixins = []

  return Orm.addModel({ attrs, opts, pos, mixins, })
}
  `,
}