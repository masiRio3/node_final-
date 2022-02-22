import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm';

import { Authorized, Field, ObjectType } from 'type-graphql';



@ObjectType()
@Entity()
export class User {

    @Field()
    @PrimaryGeneratedColumn()
    id!: number

    @Field()
    @Column()
    fullName!: string

    @Field()
    @Column()
    email!: string

    @Field()
    @Column()
    password!: string

    @Field()

    @Authorized(["admin", "user"])
    @Column({ type: "text",default: "user"})
    role!: string

    @Field()
    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: string
}