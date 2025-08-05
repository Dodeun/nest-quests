import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity/user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOneById(+id);
  }

  @Post()
  async create(
    @Body()
    user: UserEntity,
  ) {
    return this.usersService.save(user);
  }

  @Put()
  async update(
    @Body()
    user: UserEntity,
  ) {
    return this.usersService.save(user);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }
}
