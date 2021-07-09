const fileExists = require('../fileExists')
const mkdir = require('../mkdir')

module.exports = dir => { if (!fileExists(dir)) return mkdir(dir) }