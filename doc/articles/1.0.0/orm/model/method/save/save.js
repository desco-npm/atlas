module.exports = [
  {
    name: 'Script 1',
    lang: 'js',
    content: `
User.save({
  "name": Rafael",
})
    `,
  },
  {
    name: 'Resultado 1',
    lang: 'Promise',
    content: `
{
  "id": "1",
  "name": "Rafael"
}
    `,
  },
  {
    name: 'Script 2',
    lang: 'js',
    content: `
User.save({
  id: "1",
  "name": Rafael Dias",
})
    `,
  },
  {
    name: 'Resultado 2',
    lang: 'Promise',
    content: `
{
  "id": "1",
  "name": "Rafael Dias"
}
    `,
  },
]