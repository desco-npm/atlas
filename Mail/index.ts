// Framework resources
import isArray from '../lib/isArray'
import NodeMailer from '../lib/NodeMailer'

// Types
import { MailConfig, Transport, Transporter, } from './types'

// Necessary parts
import ModuleConfig from './Config'

/** Atlasjs Mail Module */
class Mail {
  /** Server Settings */
  public Config = ModuleConfig

  // Transporters created
  private transporters = {}

  /**
   * Configures the Mail
   * 
   * @param config Configures the AtlasJS Mail Module
   */
  config (config: MailConfig | undefined): this {
    // Set settings
    this.Config.set(config)

    return this
  }

  /** Retrieve a transporter */
  transporter (name: string = 'default'): Transporter | null {
    return this.transporters[name] || null
  }

  /** Prepares the Mail */
  public async prepare (): Promise<void> {
    // If you have only one configuration, put it in an array
    const mails = isArray(this.Config.get())
      ? this.Config.get()
      : [ { ...this.Config.get(), name: 'default'} ]

    // Scroll through email list and create carrier
    mails.map((m: Transport) => {
      // If it doesn't have a name, it generates a
      const name = m.name || `Mail${Object.keys(this.transporters).length + 1}`

      // Create and store the conveyor
      this.transporters[name] = NodeMailer.createTransport(m)
    })
  }

  /** Starts the Mail */
  async start (): Promise<void> {
  }
}

export default new Mail()