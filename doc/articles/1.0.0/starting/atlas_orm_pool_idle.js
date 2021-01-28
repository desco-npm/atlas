module.exports = {
  title: 'ATLAS_ORM_POOL_IDLE',
  description: `
Tempo máximo em milesegundos no qual o ORM deve permitir que uma conexão ao banco de dados fique ociosa.
  `,
  example: [
    {
      lang: 'prompt',
      content: `
ATLAS_ORM_POOL_IDLE=30000
      `,
    },
  ],
}