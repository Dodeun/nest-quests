import { Body, Controller, Post } from '@nestjs/common';
import { UserEntity } from 'src/users/user.entity/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(
    @Body() user: UserEntity,
  ): Promise<{ expires_in: number; access_token: string }> {
    return this.authService.login(user);
  }

  @Post('register')
  register(
    @Body() user: UserEntity,
  ): Promise<{ expires_in: number; access_token: string }> {
    console.log('Received body:', user);
    return this.authService.register(user);
  }
}
