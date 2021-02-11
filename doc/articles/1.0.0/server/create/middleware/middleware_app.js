module.exports = {
  name: "middlewares.js",
  lang: 'js',
  content: `
module.exports = params => {
  const { express, models, } = params

  express.use((req, res, next) => {
    /* Operation Middleware */

    next()
  })

  express.use((req, res, next) => {
    /* Operation Middleware 2 */

    next()
  })
}
  `
}