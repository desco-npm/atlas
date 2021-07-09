const TrelloNodeAPI = require('trello-node-api')
const Trello = new TrelloNodeAPI()
const key = Atlas.Config.get('Trello.key')
const token = Atlas.Config.get('Trello.token')

if (key && token) {
  Trello.setApiKey(key)
  Trello.setOauthToken(token)
}

module.exports = Trello
