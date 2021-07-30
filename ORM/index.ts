// Framework resources
import { createConnection, getConnection, Repository, } from '../lib/TypeORM'
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

  /** Default connection name */
  public defaultConnectionName = 'default'

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
  async prepare (): Promise<void> {
    const connectionConfig: ConnectionOptions = this.Config.get('connection')

    await createConnection(connectionConfig).catch(e => {
      Exception.discharge('InvalidConnection', dictionary, e)
    })

    return Promise.resolve()
  }

  /** Starts the ORM */
  async start (): Promise<void> {
  }

  /**
   * Gets connection from the connection manager.
   * If connection name wasn't specified, then "default" connection will be retrieved.
   * 
   * @param connectionName Connection name. If omitted it will be "default" by default
   */
  getConnection(connectionName?: string | undefined): Connection | undefined {
    try {
      return getConnection(connectionName)
    }
     catch(e) {
      Exception.discharge('InvalidConnectionName', dictionary, e)
    }
  }

  /**
   * Gets repository from the connection.
   * 
   * @param entity Entity Name
   * @param connectionName Connection name. If omitted it will be "default" by default
   */
  getRepository(entity: string, connectionName?: string): Repository<any> | undefined {
    return this.getConnection(connectionName)?.getRepository(entity)
  }
}

export default new ORM()