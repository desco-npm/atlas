import { ConnectionOptions, } from 'typeorm/connection/ConnectionOptions'

/** AtlasJS ORM Module Settings */
export type ORMConfig = {
  /** Database connection data (Same as TypeORM) */
  connection: ConnectionOptions | ConnectionOptions[]
}

export *  from 'typeorm'
export * from 'typeorm/connection/ConnectionOptions'
