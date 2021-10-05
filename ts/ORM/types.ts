import { ConnectionOptions, } from 'typeorm/connection/ConnectionOptions'

/** AtlasJS ORM Module Settings */
export type ORMConfig = {
  /** Database connection data (Same as TypeORM) */
  connection: ConnectionOptions | ConnectionOptions[]
}

export { Connection, Entity, Column, } from 'typeorm'
export { OneToOne, OneToMany, ManyToOne, ManyToMany, } from 'typeorm'
export { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, } from 'typeorm'
export { Like, } from 'typeorm'
export { JoinTable, JoinColumn, } from 'typeorm'
export { ConnectionOptions, } from 'typeorm/connection/ConnectionOptions'
export * from 'typeorm/connection/ConnectionOptions'