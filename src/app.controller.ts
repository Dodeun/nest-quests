import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { FilterService } from './filter/filter.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly filterService: FilterService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  getUsers(
    @Body() body: Array<{ name: string; age: number }>,
    @Query('name') name: string,
  ): Array<{ name: string; age: number }> {
    return this.filterService.filterUsers(body, name);
  }
}
