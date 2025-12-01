import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { BookingRoomResponseDto, CreateBookingDto } from './dto/booking.dto';
import { DatabaseService } from '../database/database.service';
import { Booking, Prisma } from 'generated/prisma';
import { PaginationQueryType, PaginationResult } from 'src/types/utils.types';

@Injectable()
export class BookingService {
  constructor(private prismaService:DatabaseService){}
 
 async create(createBookingDto: CreateBookingDto , userId:string) {
    if (createBookingDto.checkOut <= createBookingDto.checkIn) {
       throw new BadRequestException("checkOut date must be after checkIn date"); 
      }
    const whereClause: Prisma.RoomWhereInput = {
        isActive: true,
        isDeleted: false,
        roomId:createBookingDto.roomId,
        bookings:
           {
              none: {
                AND: [
                  { checkIn: { lt: createBookingDto.checkOut } },
                  { checkOut: { gt: createBookingDto.checkIn } },
                ],
              },
            }
     } 

    const availableRoom = await this.prismaService.room.findFirst({where:whereClause})
    console.log(availableRoom)
    
    if (!availableRoom) {
       throw new UnauthorizedException("the room is reservists")
    }
     return this.prismaService.booking.create({
      data:{
        userId,
        ...createBookingDto,
        bookingStatus:"PENDING"
      }
     })
  }
  //Pagination
   async getOwnerBookings(ownerId:string , query:PaginationQueryType):Promise<PaginationResult<BookingRoomResponseDto>>{ 
    return this.prismaService.$transaction(async (prisma) => {
        const pagination = this.prismaService.handleQueryPagination(query)
        const booking  = await prisma.booking.findMany({
          ...pagination ,
        where:{
          room:{ownerId}, 
          isDeleted:false,  
         } , 
          include:{
            room:true,
            user:true
          },
          orderBy:{
            checkIn:'asc'
          }
        }) 
        const count = await prisma.booking.count({
          where:{room:{ownerId} , isDeleted:false}
        })
        return {
          data:booking,
          ...this.prismaService.formatePaginationResult({
            page:query.page! , 
            limit:pagination.take , 
            count
           }          
          )
        } 
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  update(id: string) {
    return `This action updates a #${id} booking`;
  }

  async cancelBooking(bookingId:string , userId:string) {
    const booking = await this.prismaService.booking.findUnique({where:{bookingId}});
    if (!booking) {
       throw new BadRequestException("the booking is not found");
    }
    if (booking.userId !== userId) {
       throw new ForbiddenException("the booking is not belongs to user")
    }
    return this.prismaService.booking.update({
      where:{bookingId},
      data:{bookingStatus:'CANCELLED'}
    })
  }
}
