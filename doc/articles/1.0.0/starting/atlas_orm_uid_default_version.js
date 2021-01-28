module.exports = {
  title: 'ATLAS_ORM_UID_DEFAULT_VERSION',
  description: `
Versão do UID a ser utilizado como valor padrão nos campos UID.

Aceita somente os valores "*1*" e "*4*", consulte detalhes na [documentação do Sequelize](https://sequelize.org/master/variable/index.html#static-variable-DataTypes).
  `,
  example: [
    {
      lang: 'prompt',
      content: `
ATLAS_ORM_UID_DEFAULT_VERSION=4
      `,
    },
  ],
}