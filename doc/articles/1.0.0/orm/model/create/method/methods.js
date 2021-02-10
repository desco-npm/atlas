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
    Model.dependentMethod = () => {
      models['myOtherMethodName].myMethod()
    }
  }

  const mixins = []

  const Model = Orm.addModel({ attrs, opts, pos, mixins, })

  Model.myMethod = () => {
    console.log('myMethod!')
  }

  return Model
}
  `,
}