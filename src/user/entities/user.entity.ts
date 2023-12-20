import { AfterInsert, BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 100})
    name: string

    @Column({length: 100})
    email: string

    @Column()
    password: string

    @Column()
    role: number

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 8);
    }
}