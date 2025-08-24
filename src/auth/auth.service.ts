import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/users/user.entity/user.entity';
import { UsersService } from 'src/users/users.service';
import { UnauthorizedException } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async validate(email: string): Promise<UserEntity> {
    return this.usersService.findOneByEmail(email);
  }

  private hash(password: string): string {
    return crypto.createHmac('sha256', password).digest('hex');
  }

  public async register(user: UserEntity): Promise<any> {
    user.password = this.hash(user.password);

    return this.usersService.save(user);
  }

  public async login(
    user: UserEntity,
  ): Promise<{ expires_in: number; access_token: string }> {
    return this.validate(user.email).then((userData) => {
      if (!userData || userData.password != this.hash(user.password)) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const payload = `${userData.email}`;
      const accessToken = this.jwtService.sign(payload);

      return {
        expires_in: 3600,
        access_token: accessToken,
      };
    });
  }
}
