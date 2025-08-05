import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOneById(id: number): Promise<Partial<UserEntity>> {
    const user = await this.usersRepository.findOne({
      select: ['firstname', 'lastname', 'email'],
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }

  async save(user: UserEntity): Promise<Partial<UserEntity>> {
    const savedUser = await this.usersRepository.save(user);
    const { password, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }
}
