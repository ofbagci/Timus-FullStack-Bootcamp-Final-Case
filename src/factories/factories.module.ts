import { Module } from '@nestjs/common';
import { FactoriesController } from './factories.controller';
import { FactoriesService } from './factories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Factory } from './entities/factory.entity';
import { FactoryDetail } from 'src/factorydetail/entities/factory-detail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Factory, FactoryDetail]),
  ],
  controllers: [FactoriesController],
  providers: [FactoriesService]
})
export class FactoriesModule {}
