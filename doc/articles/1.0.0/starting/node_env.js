module.exports = {
  title: 'NODE_ENV',
  description: `
Nome do ambiente em que o projeto esta rodando.

Aceita "*production*", "*development*" ou outro valor definido pelo desenvolvedor.
  `,
  example: [
    {
      lang: 'prompt',
      content: `
NODE_ENV=development
      `,
    },
  ],
}