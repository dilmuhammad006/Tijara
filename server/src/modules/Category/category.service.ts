import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../Prisma';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    const categories = await this.prisma.category.findMany({
      include: {
        Announcement: true,
      },
    });

    return {
      message: 'success',
      data: categories,
    };
  }

  async getOne(id: number) {
    const founded = await this.prisma.category.findUnique({ where: { id } });

    if (!founded) {
      throw new NotFoundException('Category not found!');
    }

    return {
      message: 'success',
      data: founded,
    };
  }

  async create(payload: CreateCategoryDto) {
    const founded = await this.prisma.category.findFirst({
      where: { name: payload.name },
    });

    if (founded) {
      throw new ConflictException('Category already exists');
    }

    const category = await this.prisma.category.create({
      data: { name: payload.name },
    });

    return {
      message: 'success',
      data: category,
    };
  }

  async delete(id: number) {
    const founded = await this.prisma.category.findFirst({ where: { id } });
    if (!founded) {
      throw new NotFoundException('Category not found!');
    }

    await this.prisma.category.delete({ where: { id } });

    return {
      message: 'success',
    };
  }

  async update(payload: UpdateCategoryDto, id: number) {
    const founded = await this.prisma.category.findFirst({ where: { id } });

    if (!founded) {
      throw new NotFoundException('Category not found!');
    }

    const existName = await this.prisma.category.findFirst({
      where: { name: payload.name },
    });

    if (existName) {
      throw new ConflictException('This category already exists');
    }
    await this.prisma.category.update({
      where: { id },
      data: { name: payload.name },
    });

    const category = await this.prisma.category.findFirst({ where: { id } });

    return {
      message: 'success',
      data: category,
    };
  }
}
