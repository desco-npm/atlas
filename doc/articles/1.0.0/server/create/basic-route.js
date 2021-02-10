module.exports = {
  name: "User.js",
  lang: 'js',
  content: `
module.exports = async params => {
  const { express, entity, models, Model, } = params

  express.get(\`/\${entity}/\`, async (req, res) => {
    /* Operation */
  })
}
  `,
}