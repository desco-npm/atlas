module.exports = [
  {
    name: "User.js",
    lang: 'js',
    content: `
module.exports = async params => {
  require('addrs/mixin.js')(params)

  const { express, entity, models, Model, } = params

  express.get(\`/\${entity}/\`, async (req, res) => {
    /* Operation */
  })
}
    `,
  },
  {
    name: "addrs/mixin.js",
    lang: 'js',
    content: `
module.exports = async params => {
  const { express, entity, models, Model, } = params

  express.get(\`/\${entity}/operation2\`, async (req, res) => {
    /* Operation 2 */
  })
}
    `,
  },
]