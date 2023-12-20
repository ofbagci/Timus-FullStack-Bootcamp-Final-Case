import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { FactoriesService } from './factories.service';
import { CreateFactoryDto } from './dto/create-factory.dto';
import { Factory } from './entities/factory.entity';
import { EditFactoryDto } from './dto/edit-factory.dto';

@Controller('factories')
export class FactoriesController {
    constructor(private factoriesService: FactoriesService) {}

    @Post('/')
    async create(@Body() dto: CreateFactoryDto): Promise<Factory> {
        return this.factoriesService.create(dto)
    }

    @Get('/')
    async getAll(): Promise<Factory[]> {
        return this.factoriesService.getAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Factory> {
        return this.factoriesService.getOne(id);
    }

    @Patch('/')
    async edit(@Body() dto: EditFactoryDto): Promise<Object> {
        return this.factoriesService.edit(dto)
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<Factory> {
        return this.factoriesService.delete(id);
    }
}



