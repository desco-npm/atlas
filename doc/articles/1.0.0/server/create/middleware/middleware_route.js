module.exports = [
  {
    name: "User.js",
    lang: 'js',
    content: `
module.exports = async params => {
  const { express, entity, models, Model, } = params
  const middleware  = require('addrs/middleware')(params)

  express.use(\`/\${entity}/\`, middleware)

  express.get(\`/\${entity}/\`, async (req, res) => {
    /* Operation */
  })
}
    `,
  },
  {
    name: "addrs/middleware.js",
    lang: 'js',
    content: `
module.exports = params => {
  return (req, res, next) => {
    /* Operation Middleware */

    next()
  }
}
    `,
  }
]