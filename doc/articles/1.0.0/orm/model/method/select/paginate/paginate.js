module.exports = [
  {
    name: 'Script 1',
    lang: 'js',
    content: `
const Op = Atlas.Orm.Op()

User.select({
  where: { name: { [ Op.eq, ]: "Rafael", }, },
  attributes: [ 'mail', ],
  order: [ 'mail', 'asc', ],
  page: 5,
})
    `,
  },
  {
    name: 'Resultado 1',
    lang: 'Promise',
    content: `
{
  "count": 25,
  "rows": [
      {
          "id": "2a40256f-deea-4b34-b717-31a38b78a2b7",
          "mail": "hellow@mydomain.com"
      },
      /* More registers */
  ]
}
    `,
  },
  {
    name: 'Script 2',
    lang: 'js',
    content: `
const Op = Atlas.Orm.Op()

User.select({
  where: { name: { [ Op.eq, ]: "Rafael", }, },
  attributes: [ 'mail', ],
  order: [ 'mail', 'asc', ],
  page: 5,
  perPage: 5,
})
    `,
  },
  {
    name: 'Resultado 2',
    lang: 'Promise',
    content: `
{
  "count": 5,
  "rows": [
      {
          "id": "2a40256f-deea-4b34-b717-31a38b78a2b7",
          "mail": "ok@mydomain.com"
      },
      /* More registers */
  ]
}
    `,
  },
]