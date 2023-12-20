import { Body, Controller, Post, Get, Patch, Delete, Param } from '@nestjs/common';
import { FactorydetailService } from './factorydetail.service';
import { FactoryDetailDto } from './dto/factory-detail.dto';
import { FactoryDetail } from './entities/factory-detail.entity';
import { FactoryDetailEditDto } from './dto/factory-detail-edit.dto';

@Controller('factorydetail')
export class FactorydetailController {
    constructor(private service: FactorydetailService) {}

    @Post('/')
    async create(@Body() dto: FactoryDetailDto): Promise<FactoryDetail> {
        return this.service.create(dto)
    }

    @Patch('/')
    async edit(@Body() dto: FactoryDetailEditDto): Promise<Object> {
        return this.service.edit(dto)
    }

    @Delete('/:id')
    async delete(@Param('id') id: number): Promise<FactoryDetail> {
        return this.service.delete(id)
    }
}
