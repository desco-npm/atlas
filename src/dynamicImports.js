module.exports = {
  '@desco/cli-header': () => require('@desco/cli-header'),
  '@desco/sequelize-permission-resources': () => require('@desco/sequelize-permission-resources'),
  '@desco/front-to-sequelize': () => require('@desco/front-to-sequelize'),
  ...require('./dynamicImports_dev')
}