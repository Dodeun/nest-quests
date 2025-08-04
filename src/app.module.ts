import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilterService } from './filter/filter.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, FilterService],
})
export class AppModule {}
