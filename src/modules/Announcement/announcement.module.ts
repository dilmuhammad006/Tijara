import { Module } from '@nestjs/common';
import { AnnouncementController } from './announcement.controller';
import { AnnouncementService } from './announcement.service';
import { PrismaService } from '../Prisma';
import { FsHelper } from 'src/helpers';

@Module({
  controllers: [AnnouncementController],
  providers: [
    AnnouncementService,
    PrismaService,
    FsHelper,

  ],
})
export class AnnouncementModle {}
