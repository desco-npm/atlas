module.exports = {
  title: 'ATLAS_ORM_SYNC_ALTER',
  description: `
Se o ORM deve criar as tabelas no banco de dados de acordo com os modelos, caso já exista, ou atualizar a estrutura, caso já exista.
  `,
  example: [
    {
      lang: 'env',
      content: `
ATLAS_ORM_SYNC_ALTER=false
      `,
    },
  ],
}