import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
} from './dtos';
import { ApiOperation } from '@nestjs/swagger';
import { EnableRoles, Protected } from 'src/guards/decorators';
import { Roles } from '@prisma/client';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

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

  @Protected(false)
  @EnableRoles([Roles.ALL])
  @ApiOperation({
    summary: 'Forgot password',
  })
  @Post('forgot-password')
  async forgotPassword(@Body() payload: ForgotPasswordDto) {
    return await this.service.forgotPassword(payload);
  }

  @Protected(false)
  @EnableRoles([Roles.ALL])
  @ApiOperation({
    summary: 'Reset password',
  })
  @Post('reset-password')
  async resetPassword(@Body() payload: ResetPasswordDto) {
    return await this.service.resetPassword(payload);
  }

  @Protected(false)
  @EnableRoles([Roles.ALL])
  @ApiOperation({ summary: 'Login with google' })
  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async google() {}

  @Protected(false)
  @EnableRoles([Roles.ALL])
  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req) {
    return this.service.google(req.user.email);
  }
}
