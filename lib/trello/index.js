const Trello = require('trello')
const key = Atlas.Config.get('Trello.key')
const token = Atlas.Config.get('Trello.token')

module.exports = key && token ? new Trello(key, token) : Trello
