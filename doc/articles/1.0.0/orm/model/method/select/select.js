module.exports = [
  {
    name: 'Script',
    lang: 'js',
    content: `
const Op = Atlas.Orm.Op()

User.select({
  where: { name: { [ Op.eq, ]: "Rafael", }, },
  attributes: [ 'mail', ],
  order: [ 'mail', 'asc', ],
  limit: 1,
  offset: 1,
})
    `,
  },
  {
    name: 'Resultado',
    lang: 'Promise',
    content: `
{
  "count": 1,
  "rows": [
      {
          "id": "2a40256f-deea-4b34-b717-31a38b78a2b7",
          "mail": "hi@mydomain.com"
      }
  ]
}
    `,
  },
]