import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../Prisma';
import { CreateLikedDto, DeleteLikedDto, GetOneLikedDto } from './dtos';

@Injectable()
export class LikedService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(id: number) {
    const likedAnnouncements = await this.prisma.liked.findMany({
      where: { userId: id },
      include: {
        announsement: true,
      },
    });

    return {
      message: 'success',
      data: likedAnnouncements,
    };
  }

  async getOne(payload: GetOneLikedDto) {
    const founded = await this.prisma.liked.findFirst({
      where: { announcementId: payload.announcementId, userId: payload.userId },
      include: { announsement: true },
    });

    if (!founded) {
      throw new NotFoundException('Announcement not found!');
    }

    return {
      message: 'success',
      data: founded,
    };
  }

  async create(payload: CreateLikedDto) {
    const founded = await this.prisma.liked.findFirst({
      where: { announcementId: payload.announcementId, userId: payload.userId },
    });
    if (founded) {
      throw new ConflictException('You already like this announcement');
    }

    const user = await this.prisma.user.findFirst({
      where: { id: payload.userId },
    });
    const announcement = await this.prisma.announcement.findFirst({
      where: { id: payload.announcementId },
    });

    if (!user) {
      throw new BadRequestException('You are not registered');
    }
    if (!announcement) {
      throw new NotFoundException('Annoucement not found!');
    }

    const liked = await this.prisma.liked.create({
      data: { announcementId: payload.announcementId, userId: payload.userId },
    });
    return {
      message: 'success',
      data: liked,
    };
  }

  async delete(payload: DeleteLikedDto) {
    const founded = await this.prisma.liked.findFirst({
      where: { userId: payload.userId, announcementId: payload.announcementId },
    });

    if (!founded) {
      throw new NotFoundException('Announcement not found!');
    }

    return {
      message: 'success',
    };
  }
}
