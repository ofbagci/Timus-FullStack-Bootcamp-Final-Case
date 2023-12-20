import { Module } from '@nestjs/common';
import { FactorydetailService } from './factorydetail.service';
import { FactorydetailController } from './factorydetail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FactoryDetail } from './entities/factory-detail.entity';
import { Factory } from 'src/factories/entities/factory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Factory, FactoryDetail]),
  ],
  providers: [FactorydetailService],
  controllers: [FactorydetailController]
})
export class FactorydetailModule {}
