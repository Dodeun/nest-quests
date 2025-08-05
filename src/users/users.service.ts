import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity/user.entity';
import { Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/browser';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<UserEntity[]> {
    return this.usersRepository.find({
      select: ['firstname', 'lastname', 'email'],
      where: [{ id }],
    });
  }

  async save(user: UserEntity): Promise<UserEntity> {
    return this.usersRepository.save(user);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }
}
