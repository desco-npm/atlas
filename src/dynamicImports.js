module.exports = {
  '@desco/cli-header': () => require('@desco/cli-header'),
  '@desco/front-to-sequelize': () => require('@desco/front-to-sequelize'),
  ...require('./dynamicImports_dev'),
}