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
import { ApiOperation } from '@nestjs/swagger';

@Controller('liked')
export class LikedController {
  constructor(private readonly service: LikedService) {}

  @ApiOperation({
    summary: 'Get all liked announcements',
  })
  @Get(':id')
  async getAll(@Param('id', ParseIntPipe) id: number) {
    return await this.service.getAll(id);
  }

  @ApiOperation({
    summary: 'Get one liked announcement',
  })
  @Get()
  async getOne(@Query() payload: GetOneLikedDto) {
    return await this.service.getOne(payload);
  }

  @ApiOperation({
    summary: 'Create new liked announcement',
  })
  @Post()
  async create(@Body() payload: CreateLikedDto) {
    return await this.service.create(payload);
  }

  @ApiOperation({
    summary: 'Delete one liked announcement',
  })
  @Delete()
  async delete(@Query() payload: DeleteLikedDto) {
    return await this.service.delete(payload);
  }
}
