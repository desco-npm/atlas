import { ConnectionOptions, } from 'typeorm/connection/ConnectionOptions'

/** AtlasJS ORM Module Settings */
export type ORMConfig = {
  /** Database connection data (Same as TypeORM) */
  connection: ConnectionOptions | ConnectionOptions[]
}

export { Connection, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, } from 'typeorm'
export { OneToOne, OneToMany, ManyToOne, ManyToMany, } from 'typeorm'
export { UpdateDateColumn, JoinTable, JoinColumn, } from 'typeorm'
export { ConnectionOptions, } from 'typeorm/connection/ConnectionOptions'