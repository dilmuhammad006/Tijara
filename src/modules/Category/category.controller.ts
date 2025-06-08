import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';
import { ApiOperation } from '@nestjs/swagger';

@Controller('category')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all categories',
  })
  async getAll() {
    return await this.service.getAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get one category',
  })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.getOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create new category',
  })
  async create(@Body() payload: CreateCategoryDto) {
    return await this.service.create(payload);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete category',
  })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.service.delete(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update category',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCategoryDto,
  ) {
    return await this.service.update(payload, id);
  }
}
