import { Factory } from "src/factories/entities/factory.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'details'})
export class FactoryDetail extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    dateRange: string

    @Column()
    unit: string

    @Column()
    usage: number

    @Column()
    usageCost: number

    @Column()
    discountedPrice: number

    @Column({name: 'factoryId'})
    factoryId: number

    @ManyToOne(() => Factory, (f) => f.details, {onDelete: 'SET NULL'})
    @JoinColumn({name: 'factoryId'})
    factory: Factory

}