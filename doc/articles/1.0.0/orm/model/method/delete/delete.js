module.exports = [
  {
    name: 'Script',
    lang: 'js',
    content: `
User.delete('1;2;3;4')
    `,
  },
  {
    name: 'Resultado',
    lang: 'Promise',
    content: `
{
  "amount": 4
}
    `,
  },
]