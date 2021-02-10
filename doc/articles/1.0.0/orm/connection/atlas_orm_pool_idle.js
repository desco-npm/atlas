module.exports = {
  title: 'ATLAS_ORM_POOL_IDLE',
  description: `
Tempo máximo em milissegundos no qual o ORM deve permitir que uma conexão ao banco de dados fique ociosa.
  `,
  example: [
    {
      lang: 'env',
      content: `
ATLAS_ORM_POOL_IDLE=30000
      `,
    },
  ],
}