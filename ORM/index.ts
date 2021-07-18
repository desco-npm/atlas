// Framework resources
import { createConnection, getConnection, } from '../lib/TypeORM'
import 'reflect-metadata'

// Framework Modules
import Exception from '../Exception'

// Types
import { ORMConfig, ConnectionOptions, Connection, } from './types'

// Necessary parts
import ModuleConfig from './Config'
import dictionary from './dictionary'

class ORM {
  /** Message settings */
  public Config = ModuleConfig

  /**
   * Configures the AtlasJS Message Module
   * 
   * @param config Configures the AtlasJS Message Module
   **/
  config (config: ORMConfig | undefined): this {
    // Arrow settings
    this.Config.set(config)

    return this
  }

  /** Prepares the ORM */
  private async prepare (): Promise<void> {
    const connection: ConnectionOptions = this.Config.get('connection')

    await createConnection(connection).catch(e => {
      Exception.discharge('InvalidConnection', dictionary, e)
    })

    return Promise.resolve()
  }

  /** Starts the ORM */
  async start (): Promise<void> {
    // Prepares the ORM
    await this.prepare()
  }

  /**
   * Gets connection from the connection manager.
   * If connection name wasn't specified, then "default" connection will be retrieved.
   */
  getConnection(connectionName?: string): Connection | undefined {
    try {
      return getConnection(connectionName)
    }
    catch (e) {
      Exception.discharge('InvalidConnectionName', dictionary, e)
    }
  }
}

export default new ORM()