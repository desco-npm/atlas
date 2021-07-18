import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
} from '../../ORM/types';

@Entity()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    id: number | undefined;

    @Column('varchar', { length: 200 })
    title: string;

    @Column('text')
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}