module.exports = [
  {
    name: 'Script',
    lang: 'js',
    content: `
User.selectById(1)
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