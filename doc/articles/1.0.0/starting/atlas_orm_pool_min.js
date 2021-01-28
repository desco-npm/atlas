module.exports = {
  title: 'ATLAS_ORM_POOL_MIN',
  description: `
Número mínimo de conexões ao banco de dados ativas que o ORM deve gerenciar. 
  `,
  example: [
    {
      lang: 'env',
      content: `
ATLAS_ORM_POOL_MIN=1
      `,
    },
  ],
}