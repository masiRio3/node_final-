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

    
    @Authorized(["admin", "user"])
    @Field(() => [User], { nullable: true })
    @Column({ type: "text",default:"user"})
    role!: string[]

    @Field()
    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: string
}