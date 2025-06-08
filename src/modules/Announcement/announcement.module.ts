import { Module } from '@nestjs/common';
import { AnnouncementController } from './announcement.controller';
import { AnnouncementService } from './announcement.service';
import { PrismaService } from '../Prisma';

@Module({
  controllers: [AnnouncementController],
  providers: [AnnouncementService, PrismaService],
})
export class AnnouncementModle {}
