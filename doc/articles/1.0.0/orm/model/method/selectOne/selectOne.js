module.exports = [
  {
    name: 'Script',
    lang: 'js',
    content: `
const Op = Atlas.Orm.Op()

User.selectOne({
  where: { id: { [ Op.eq, ]: 1, }, },
  attributes: [ 'mail', ],
})
    `,
  },
  {
    name: 'Resultado',
    lang: 'Promise',
    content: `
{
    "id": "2a40256f-deea-4b34-b717-31a38b78a2b7",
    "mail": "hi@mydomain.com"
}
    `,
  },
]