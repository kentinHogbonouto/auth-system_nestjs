import { FeatureModule } from './features/features.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { environments } from './environments/environments';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    FeatureModule,
    MongooseModule.forRoot(environments.mongoUri, {
      autoIndex: false,
      useFindAndModify: false,
    }),
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
