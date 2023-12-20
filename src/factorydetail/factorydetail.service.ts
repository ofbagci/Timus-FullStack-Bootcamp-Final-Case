import { Injectable, NotFoundException } from '@nestjs/common';
import { FactoryDetail } from './entities/factory-detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FactoryDetailDto } from './dto/factory-detail.dto';
import { FactoryDetailEditDto } from './dto/factory-detail-edit.dto';
import { Factory } from 'src/factories/entities/factory.entity';

@Injectable()
export class FactorydetailService {
    constructor(
        @InjectRepository(FactoryDetail)
        private readonly factoryDetailRepo: Repository<FactoryDetail>,

        @InjectRepository(Factory)
        private readonly factoryRepo: Repository<Factory>,
    ) { }


    async create(dto: FactoryDetailDto): Promise<FactoryDetail> {
        let factoryDetail = this.factoryDetailRepo.create(dto)
        return await this.factoryDetailRepo.save(factoryDetail)
    }

    async edit(dto: FactoryDetailEditDto): Promise<Object> {
        const detail = await this.factoryDetailRepo.findOneBy({ id: dto.id })

        if (!detail) {
            throw new NotFoundException("Detail not found")
        } else {
            await this.factoryDetailRepo.update(detail.id, { ...dto })
            return await this.factoryDetailRepo.findOneBy({ id: dto.id })
        }
    }

    async delete(id: number): Promise<FactoryDetail> {
        const detail = await this.factoryDetailRepo.findOneBy({ id: id })

        if (!detail) {
            throw new NotFoundException("Detail not found")
        } else {
            await this.factoryDetailRepo.delete({ id: id })
            return detail
        }
    }
}
