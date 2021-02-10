module.exports = {
  title: 'ATLAS_ORM_DB_DIALOG',
  description: `
Qual o tipo do banco de dados com o qual o ORM deve se conectar.

Consulte a [documentação do Sequelize](https://sequelize.org/master/manual/getting-started.html) para saber os valores possíveis.
  `,
  example: [
    {
      lang: 'env',
      content: `
ATLAS_ORM_DB_DIALOG=mysql
      `,
    },
  ],
}