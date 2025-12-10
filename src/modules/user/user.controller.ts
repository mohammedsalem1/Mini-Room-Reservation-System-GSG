import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { IsPublic } from 'src/decorator/public.decorator';
import { Roles } from 'src/decorator/role.decorator';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipes';
import { PaginationQueryTypeSchema } from 'src/utils/pagination.validation.schema';
import type { PaginationQueryType } from 'src/types/utils.types';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('jwt')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  @Roles(['ADMIN'])
  findAll(@Query(new ZodValidationPipe(PaginationQueryTypeSchema))
      query:PaginationQueryType) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
