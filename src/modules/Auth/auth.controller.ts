import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dtos';
import { ApiOperation } from '@nestjs/swagger';
import { EnableRoles, Protected } from 'src/guards/decorators';
import { Roles } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Protected(false)
  @EnableRoles([Roles.ALL])
  @ApiOperation({
    summary: 'Register',
  })
  @Post('register')
  async register(@Body() payload: RegisterDto) {
    return await this.service.register(payload);
  }

  @Protected(false)
  @EnableRoles([Roles.ALL])
  @ApiOperation({
    summary: 'Login',
  })
  @Post('login')
  async login(@Body() payload: LoginDto) {
    return await this.service.login(payload);
  }
}
