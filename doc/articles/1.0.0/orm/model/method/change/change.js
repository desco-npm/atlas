module.exports = [
  {
    name: 'Script',
    lang: 'js',
    content: `
User.change({
  "id": 1,
  "name": Rafael Dias",
})
    `,
  },
  {
    name: 'Resultado',
    lang: 'Promise',
    content: `
{
  "id": "1",
  "name": "Rafael Dias"
}
    `,
  },
]