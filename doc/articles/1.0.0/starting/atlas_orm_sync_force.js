module.exports = {
  title: 'ATLAS_ORM_SYNC_FORCE',
  description: `
Se o ORM deve criar as tabelas no banco de dados de acordo com os modelos, antes removendo as já existentes.
  `,
  example: [
    {
      lang: 'env',
      content: `
ATLAS_ORM_SYNC_FORCE=false
      `,
    },
  ],
}