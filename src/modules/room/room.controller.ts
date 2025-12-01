import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, Req, Query } from '@nestjs/common';
import { RoomService } from './room.service';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipes';
import { createRoomValidationSchema, updateRoomValidationSchema } from './utils/room.validation.schema';
import { CreateRoomDto, RoomFilterDto, UpdateRoomDto } from './dto/room.dto';
import { ApiBasicAuth, ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/decorator/role.decorator';
import { request, Request } from 'express';
import { IsPublic } from 'src/decorator/public.decorator';

@Controller('room')
@ApiBearerAuth('jwt')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}
  
  @ApiOperation({summary:"Create room by Owner"})
  @ApiOkResponse({description:"the owner create room successfully"})
  @Roles(['OWNER'])
  @UsePipes(new ZodValidationPipe(createRoomValidationSchema))
  @Post('create')
  create(
    @Body() createRoomDto: CreateRoomDto,
    @Req() request:Express.Request) {
    return this.roomService.create(createRoomDto , request.user.userId);
  }
  @Roles(['GUEST'])
  @ApiOperation({ summary: "Get all available rooms for Guests" })
  @ApiOkResponse({ description: "Returns all rooms available in the specified period and filters" })
  @Get('available')
  findAvailableRooms(
    @Query() filterDto: RoomFilterDto
  ) { 
    return this.roomService.findAvailableRooms(filterDto); 
  }

  @ApiOperation({summary:"Update room by Owner"})
  @ApiOkResponse({description:"the owner update room successfully"})
  @Roles(['OWNER'])
  @Patch(':roomId')
  @UsePipes(new ZodValidationPipe(updateRoomValidationSchema))
  update(
    @Param('roomId') roomId: string,
    @Req() request:Express.Request, 
    @Body() updateRoomDto:UpdateRoomDto
   ) {
    const ownerId = request.user.userId
    return this.roomService.update(roomId , ownerId , updateRoomDto);
  }

  @Roles(['OWNER'])
  @ApiOkResponse({description:'the owner deleted the room'}) 
  @Delete(':roomId')
  remove(@Param('roomId') roomId: string) {
    return this.roomService.remove(roomId);
  }
}
