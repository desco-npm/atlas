module.exports = {
  name: "User.js",
  lang: 'js',
  content: `
module.exports = async params => {
  const { express, entity, models, Model, middleware, mixin, } = params

  mixin.MixinName({ express, entity, middleware, models, Model, mixin, })
  
  express.use(\`/crud/\${entity}/\`, middleware.middlewareName)

  express.get(\`/crud/\${entity}/\`, async (req, res) => {
    /* Operation */
  })
}
  `,
}