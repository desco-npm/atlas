const fs = require('../fs')

module.exports = (base64, dir) => {
  const matches = base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
  const response = {}

  if (matches.length !== 3)
  {
    return Promise.reject(new Error('Invalid input string'))
  }

  response.type = matches[1]
  response.data = Buffer.from(matches[2], 'base64')

  return fs.writeFile(dir, response.data)
}