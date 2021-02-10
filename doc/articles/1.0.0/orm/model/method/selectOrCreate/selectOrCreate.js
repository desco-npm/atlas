module.exports = [
  {
    name: 'Script 1',
    lang: 'js',
    content: `
const Op = Atlas.Orm.Op()

User.findOrCreate({
  where: { name: { [ Op.eq, ]: 'Rafael', }, },
  defaults: { name: 'Rafael', },
})
    `,
  },
  {
    name: 'Resultado 1',
    lang: 'Promise',
    content: `
[
  {
    "id": "2a40256f-deea-4b34-b717-31a38b78a2b7",
    "mail": "hi@mydomain.com"
  },
  false
]
    `,
  },
  {
    name: 'Script 2',
    lang: 'js',
    content: `
const Op = Atlas.Orm.Op()

User.findOrCreate({
  where: { name: { [ Op.eq, ]: 'Satoshi', }, },
  defaults: { name: 'Satoshi', },
})
    `,
  },
  {
    name: 'Resultado 2',
    lang: 'Promise',
    content: `
[
  null,
  true
]
    `,
  },
]