import { FactoryDetail } from "src/factorydetail/entities/factory-detail.entity";
import { AfterInsert, AfterLoad, AfterUpdate, BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Factory extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    subscriptionStart: string

    @Column()
    subscriptionEnd: string

    @Column()
    employeeCount: number

    @Column()
    isEmployeeFree: boolean

    @OneToMany(() => FactoryDetail, (detail) => detail.factory)
    details: FactoryDetail[]
}