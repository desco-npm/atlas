module.exports = [
  {
    name: 'Script',
    lang: 'js',
    content: `
// req.query = Express QueryString params
Atlas.Orm.treatParameters(req.query)
    `,
  }
]