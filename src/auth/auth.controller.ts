import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto/index';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';

import { Auth } from './decorators/auth.decorator';
import { ValidRoles } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('/check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.chechAuthStatus(user);
  }

  @Get('/activate-clouster')
  activateClouster() {
    return this.authService.activateClouster();
  }

  @Get('private')
  @Auth(ValidRoles.admin)
  testingPrivateRoute(@GetUser() user: User) {
    return {
      user,
    };
  }
}
