module.exports = [
  {
    name: 'Script',
    lang: 'js',
    content: `
User.insert({
  "name": Rafael",
})
    `,
  },
  {
    name: 'Resultado',
    lang: 'Promise',
    content: `
{
  "id": "1",
  "name": "Rafael"
}
    `,
  },
]