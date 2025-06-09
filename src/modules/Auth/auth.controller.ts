import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dtos';
import { ApiOperation } from '@nestjs/swagger';
import { EnableRoles, Protected } from 'src/guards/decorators';
import { Roles } from '@prisma/client';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Protected(false)
  @EnableRoles([Roles.ALL])
  @ApiOperation({
    summary: 'Register',
  })
  @Post('register')
  async register(@Body() payload: RegisterDto, @Res() res: Response) {
    const data = await this.service.register(payload);

    res.cookie('accessToken', data.data.token, {
      maxAge: 20 * 60 * 1000,
      secure: false,
    });

    res.send(data);
  }

  @Protected(false)
  @EnableRoles([Roles.ALL])
  @ApiOperation({
    summary: 'Login',
  })
  @Post('login')
  async login(@Body() payload: LoginDto, @Res() res: Response) {
    const data = await this.service.login(payload);

    res.cookie('accessToken', data.data.token, {
      maxAge: 20 * 60 * 1000,
      secure: false,
    });

    res.send(data);
  }
}
