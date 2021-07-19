// Framework Modules
import Message from '../Message'

// Necessary parts
import Config from '../Config' // Generic class of configations
import dictionary from './dictionary' // Generic class of configations

// Mail Settings Interface
import { MailConfig as MailConfigType, } from './types'

/** AtlasJS Mail Module */
class MailConfig extends Config {
  constructor () {
    super()

    // Set the default settings
    this.setDefaults({
    } as MailConfigType)
  }
}

export default new MailConfig()