import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../Prisma';
import { JwtModule } from '@nestjs/jwt';
import { FsHelper } from 'src/helpers';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_SECRET_TIME,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, FsHelper],
})
export class AuthModule {}
