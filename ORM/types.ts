import { ConnectionOptions, } from 'typeorm/connection/ConnectionOptions'

/** AtlasJS ORM Module Settings */
export type ORMConfig = {
  /** Database connection data (Same as TypeORM) */
  connection: ConnectionOptions | ConnectionOptions[]
}

export { Connection, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, } from 'typeorm'
export { UpdateDateColumn, OneToMany, ManyToOne, } from 'typeorm'
export { ConnectionOptions, } from 'typeorm/connection/ConnectionOptions'

