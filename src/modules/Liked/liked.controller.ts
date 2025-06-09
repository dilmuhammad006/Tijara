import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { LikedService } from './liked.service';
import { CreateLikedDto, DeleteLikedDto, GetOneLikedDto } from './dtos';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { EnableRoles, Protected } from 'src/guards/decorators';
import { Roles } from '@prisma/client';

@ApiBearerAuth()
@Controller('liked')
export class LikedController {
  constructor(private readonly service: LikedService) {}

  @Protected(true)
  @EnableRoles([Roles.ALL])
  @ApiOperation({
    summary: 'Get all liked announcements',
  })
  @Get(':id')
  async getAll(@Param('id', ParseIntPipe) id: number) {
    return await this.service.getAll(id);
  }

  @Protected(true)
  @EnableRoles([Roles.ALL])
  @ApiOperation({
    summary: 'Get one liked announcement',
  })
  @Get()
  async getOne(@Query() payload: GetOneLikedDto) {
    return await this.service.getOne(payload);
  }

  @Protected(true)
  @EnableRoles([Roles.ALL])
  @ApiOperation({
    summary: 'Create new liked announcement',
  })
  @Post()
  async create(@Body() payload: CreateLikedDto) {
    return await this.service.create(payload);
  }

  @Protected(true)
  @EnableRoles([Roles.ALL])
  @ApiOperation({
    summary: 'Delete one liked announcement',
  })
  @Delete()
  async delete(@Query() payload: DeleteLikedDto) {
    return await this.service.delete(payload);
  }
}
