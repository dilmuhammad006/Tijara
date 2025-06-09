import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Global,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService, TokenExpiredError, JsonWebTokenError } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { PROTECTED_KEY } from './decorators';
import { Request } from 'express';
import { Roles } from '@prisma/client';

@Injectable()
@Global()
export class CheckAuth implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwt: JwtService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isProtected = this.reflector.getAllAndOverride<boolean>(
      PROTECTED_KEY,
      [context.getHandler(), context.getClass()],
    );

    const ctx = context.switchToHttp();
    const request = ctx.getRequest<
      Request & { role?: Roles; userId?: string }
    >();

    if (!isProtected) {
      request.role = Roles.USER;
      return true;
    }

    const token = request.headers['authorization'];

    if (!token || !token.startsWith('Bearer ')) {
      throw new BadRequestException('Incorrect token format');
    }

    const accessToken = token.split(' ')[1];

    if (!accessToken) {
      throw new BadRequestException('Access token not provided');
    }

    try {
      const payload = this.jwt.verify(accessToken, {
        secret: process.env.JWT_SECRET,
      });

      request.userId = payload?.id;
      request.role = payload?.role;

      return true;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new ForbiddenException('Token has expired');
      } else if (error instanceof JsonWebTokenError) {
        throw new ForbiddenException('Invalid token');
      } else {
        throw new InternalServerErrorException('Internal server error');
      }
    }
  }
}
