import { Injectable } from '@nestjs/common';
import { PrismaService } from '../Prisma';

@Injectable()
export class AnnouncementService {
  constructor(private readonly prisma: PrismaService) {}
}
