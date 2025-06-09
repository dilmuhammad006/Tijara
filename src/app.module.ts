import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  AnnouncementModle,
  AuthModule,
  CategoryModule,
  LikedModule,
  PrismaModule,
} from './modules';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { APP_GUARD } from '@nestjs/core';
import { CheckAuth, CheckRole } from './guards';
import { MailModule } from './utils';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),
    PrismaModule,
    AuthModule,
    CategoryModule,
    AnnouncementModle,
    LikedModule,
    MailModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: CheckAuth,
    },
    {
      provide: APP_GUARD,
      useClass: CheckRole,
    },
  ],
})
export class AppModule {}
