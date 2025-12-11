import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRoomDto, RoomFilterDto, RoomOverviewResponseDto, UpdateRoomDto } from './dto/room.dto';
import { DatabaseService } from '../database/database.service';
import { Prisma } from 'generated/prisma';
import { PaginationQueryType, PaginationResult } from 'src/types/utils.types';

@Injectable()
export class RoomService {
  constructor(
    private prismaService:DatabaseService
  ){}
  async create(createRoomDto: CreateRoomDto , ownerId:string) {
   const exists = await this.prismaService.room.findFirst({
      where: {
        ownerId,
        roomName: createRoomDto.roomName,
        isDeleted: false,
      },
    });

    if (exists) {
      throw new BadRequestException("Room with this name already exists");
    }
    return this.prismaService.room.create({
      data:{
        ...createRoomDto , 
        ownerId ,
        isActive:true    , 
        isDeleted:false  , 
      }
    });
  }
   async findAllRooms(query:PaginationQueryType):Promise<PaginationResult<RoomOverviewResponseDto>> {
    const pagination = this.prismaService.handleQueryPagination(query)
    const rooms  = await this.prismaService.room.findMany({
      ...pagination , 
      where:{isDeleted:false},
      include:{bookings:true}
    })
    const count =  await this.prismaService.user.count()
        return {
          data:rooms,
          ...this.prismaService.formatePaginationResult({
            page:query.page! , 
            limit:pagination.take , 
            count
           }          
          )
        } 
      }
async findAvailableRooms(filterDto: RoomFilterDto) {
    const { checkIn, checkOut, minPrice, maxPrice, minCapacity, maxCapacity } = filterDto;

    const checkInDate = checkIn ? new Date(checkIn) : undefined;
    const checkOutDate = checkOut ? new Date(checkOut) : undefined;

    const minPriceNum = minPrice !== undefined ? Number(minPrice) : undefined;
    const maxPriceNum = maxPrice !== undefined ? Number(maxPrice) : undefined;
    const minCapacityNum = minCapacity !== undefined ? Number(minCapacity) : undefined;
    const maxCapacityNum = maxCapacity !== undefined ? Number(maxCapacity) : undefined;

    const whereClause: Prisma.RoomWhereInput = {
      isActive: true,
      isDeleted: false,
      roomPrice:
        minPriceNum !== undefined && maxPriceNum !== undefined
          ? { gte: minPriceNum, lte: maxPriceNum }
          : undefined,
      roomCapacity:
        minCapacityNum !== undefined || maxCapacityNum !== undefined
          ? {
              ...(minCapacityNum !== undefined ? { gte: minCapacityNum } : {}),
              ...(maxCapacityNum !== undefined ? { lte: maxCapacityNum } : {}),
            }
          : undefined,
      bookings:
        checkInDate && checkOutDate
          ? {
              none: {
                AND: [
                  { checkIn: { lt: checkOutDate } },
                  { checkOut: { gt: checkInDate } },
                ],
              },
            }
          : undefined,
    };

    try {
      return await this.prismaService.room.findMany({
        where: whereClause,
      });
    } catch (error) {
      console.error('Error fetching available rooms:', error);
      throw new InternalServerErrorException('Cannot fetch rooms');
    }
}



  async update(roomId:string , ownerId:string , updateRoomDto:UpdateRoomDto) {
    // cheak room belong to ownerId 
    const room = await this.prismaService.room.findUnique({where:{roomId}})

    if (!room) {
    throw new NotFoundException("Room not found");
  }

  if (room.ownerId !== ownerId) {
    throw new ForbiddenException("the owner do not own this room");
  }

  return await this.prismaService.room.update({
    where: { roomId },
    data: updateRoomDto,
  });
  }

  remove(roomId: string) {
    return this.prismaService.room.update({
      where:{roomId} , 
      data:{isDeleted:true}
    });
  }
}
