const fs = require('../fs')

module.exports = (base64, dir) => {
  var matches = base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
  var response = {}

  if (matches.length !== 3)
  {
    return new Error('Invalid input string')
  }

  response.type = matches[1]
  response.data = new Buffer(matches[2], 'base64')

  return fs.writeFile(dir, response.data)
}