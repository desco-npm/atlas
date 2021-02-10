module.exports = [
  {
    name: "User.js",
    lang: 'js',
    content: `
const MyMixin = require('./MyMixin')

module.exports = ({ DataTypes, Orm, }) => {
  const attrs = {
      /* ... */
    }
  },

  const opts = {}

  const pos = ({ Model, models, }) => {}

  const mixins = [ MyMixin, ]

  return Orm.addModel({ attrs, opts, pos, mixins, })
}
    `,
  },
  {
    name: "MyMixin.js",
    lang: 'js',
    content: `
module.exports = {
  MyMixin: {
    myProp: true,
    myMethod () {},
  }
}
    `,
  }
]