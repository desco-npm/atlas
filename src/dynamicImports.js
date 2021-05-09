module.exports = {
  '@desco/cli-header': () => require('@desco/cli-header'),
  '@desco/sequelize-permission-resources': () => require('@desco/sequelize-permission-resources'),
  ...require('./dynamicImports_dev')
}