import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/users/user.entity/user.entity';
import { UsersService } from 'src/users/users.service';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private async validate(email: string): Promise<UserEntity> {
    return this.usersService.findOneByEmail(email);
  }

  private hash(password: string): string {
    return crypto.createHmac('sha256', password).digest('hex');
  }

  public async register(user: UserEntity): Promise<any> {
    user.password = this.hash(user.password);

    return this.usersService.save(user);
  }

  public async login({ email, password }): Promise<any | { status: number }> {}
}
