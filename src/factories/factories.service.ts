import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFactoryDto } from './dto/create-factory.dto';
import { Factory } from './entities/factory.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { FactoryDetail } from 'src/factorydetail/entities/factory-detail.entity';
import { EditFactoryDto } from './dto/edit-factory.dto';

@Injectable()
export class FactoriesService {
    constructor(
        @InjectRepository(Factory)
        private readonly factoryRepo: Repository<Factory>,
    ) { }

    async create(dto: CreateFactoryDto): Promise<Factory> {
        dto.subscriptionStart = new Date().toLocaleDateString('tr-TR');
        dto.subscriptionEnd = new Date(dto.subscriptionEnd).toLocaleDateString('tr-TR')

        let factory = this.factoryRepo.create(dto)
        return await this.factoryRepo.save(factory)
    }

    async getOne(id: number): Promise<Factory> {
        return await this.factoryRepo.findOne({
            relations: { details: true },
            where: {
                id: id
            }
        })
    }

    async getAll(): Promise<Factory[]> {
        return await this.factoryRepo.find({
            relations: { details: true },
        })
    }

    async edit(dto: EditFactoryDto): Promise<Factory> {
        const factory = await this.factoryRepo.findOneBy({ id: dto.id })

        if (!factory) {
            throw new NotFoundException("Factory does not exist")
        } else {
            await this.factoryRepo.update(factory.id, { ...dto })
            return await this.factoryRepo.findOneBy({ id: dto.id })
        }
    }

    async delete(id: number): Promise<Factory> {
        const factory = await this.factoryRepo.findOneBy({ id: id })

        if (!factory) {
            throw new NotFoundException("Factory does not exist")
        } else {
            await this.factoryRepo.delete({ id: id })
            return factory
        }
    }
}
