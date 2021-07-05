const fileExists = require('../fileExists')

module.exports = dir => { if (!fileExists(dir)) mkdir(dir) }