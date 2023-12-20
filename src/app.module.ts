import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { FactoriesModule } from './factories/factories.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { TokenVerificationMiddleware } from './common/middleware/middleware';
import { FactorydetailModule } from './factorydetail/factorydetail.module';
import { Factory } from './factories/entities/factory.entity';
import { FactoryDetail } from './factorydetail/entities/factory-detail.entity';
import { FactoriesController } from './factories/factories.controller';
import { FactorydetailController } from './factorydetail/factorydetail.controller';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "",
    database: "postgres",
    entities: [User, Factory, FactoryDetail],
    synchronize: true,
  }),
    FactoriesModule,
    UserModule,
    FactorydetailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenVerificationMiddleware)
      .exclude({ path: 'user', method: RequestMethod.ALL })
      .forRoutes(FactoriesController, FactorydetailController)
  }
}
