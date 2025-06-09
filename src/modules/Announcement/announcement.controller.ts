import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { ApiConsumes, ApiCookieAuth, ApiOperation } from '@nestjs/swagger';
import {
  CreateAnnouncementDto,
  UpdateAnnouncementDto,
  UpdateImageDto,
} from './dtos';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CheckFileMimeType, CheckFileSize } from 'src/pipes';
import { EnableRoles, Protected } from 'src/guards/decorators';
import { Roles } from '@prisma/client';

@ApiCookieAuth()
@Controller('announcement')
export class AnnouncementController {
  constructor(private readonly service: AnnouncementService) {}

  @Protected(true)
  @EnableRoles([Roles.ALL])
  @ApiOperation({
    summary: 'Get all announcements',
  })
  @Get()
  async getAll() {
    return await this.service.getAll();
  }

  @Protected(true)
  @EnableRoles([Roles.ALL])
  @ApiOperation({
    summary: 'Get one announcement and mark as seen',
  })
  @Get(':id/:userId')
  async getOne(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.service.getOne(id, userId);
  }

  @Protected(true)
  @EnableRoles([Roles.ALL])
  @ApiOperation({
    summary: 'Create new announcement',
  })
  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() payload: CreateAnnouncementDto,
    @UploadedFiles(
      new CheckFileSize(10 * 1024 * 1024),
      new CheckFileMimeType(['jpeg', 'png', 'jpg', 'mpeg', 'jfif', 'gif']),
    )
    images: Express.Multer.File[],
  ) {
    return this.service.create(payload, images);
  }

  @Protected(true)
  @EnableRoles([Roles.ALL])
  @ApiOperation({
    summary: 'Delete announcement',
  })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.service.delete(id);
  }

  @Protected(true)
  @EnableRoles([Roles.ALL])
  @ApiOperation({
    summary: 'Update announcement info',
  })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateAnnouncementDto,
  ) {
    return await this.service.update(payload, id);
  }

  @Protected(true)
  @EnableRoles([Roles.ALL])
  @ApiOperation({
    summary: 'Update announcement image',
  })
  @Put(':id')
  @UseInterceptors(FilesInterceptor('images'))
  @ApiConsumes('multipart/form-data')
  async updateImage(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles(
      new CheckFileSize(10 * 1024 * 1024),
      new CheckFileMimeType(['jpeg', 'png', 'jpg', 'mpeg', 'jfif', 'gif']),
    )
    images: Express.Multer.File[],
    @Body() image: UpdateImageDto,
  ) {
    return await this.service.updateImage(images, id);
  }

  @Protected(true)
  @EnableRoles([Roles.ALL])
  @ApiOperation({
    summary: 'Get announcements by search announcements',
  })
  @Get('search')
  async findByName(@Query('name') name: string) {
    return await this.service.getByName(name);
  }
}
