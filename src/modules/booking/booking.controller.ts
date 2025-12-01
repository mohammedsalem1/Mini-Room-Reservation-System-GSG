import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, Req, Query } from '@nestjs/common';
import { BookingService } from './booking.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipes';
import { createBookingValidationSchema } from './utils/booking.validation.schema';
import { CreateBookingDto } from './dto/booking.dto';
import { request } from 'http';
import { Roles } from 'src/decorator/role.decorator';
import { PaginationQueryTypeSchema } from 'src/utils/pagination.validation.schema';
import type { PaginationQueryType } from 'src/types/utils.types';
@ApiBearerAuth('jwt')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}
 
 
  @ApiCreatedResponse({ description: 'The booking has been successfully created'})
  @Roles(['GUEST'])
  @Post('create')
  @UsePipes(new ZodValidationPipe(createBookingValidationSchema))
  create(
    @Body() createBookingDto: CreateBookingDto,
    @Req()  request:Express.Request  
  ) {
    const userId = request.user.userId
    return this.bookingService.create(createBookingDto , userId);
  }

  @Get('owner')
  @Roles(['OWNER'])
  @ApiOkResponse({description:"View all bookings associated with their rooms"})
  getOwnerBookings(
    @Query(new ZodValidationPipe(PaginationQueryTypeSchema))
    query:PaginationQueryType,
    @Req() request:Express.Request) {
     const ownerId = request.user.userId;
     return this.bookingService.getOwnerBookings(ownerId , query)
  }

  @Roles(['GUEST'])
  @ApiOkResponse({description:"Thw guest cancel booking successfully"})
  @Delete(':bookingId/cancel')
  cancelBooking(
    @Param('bookingId') bookingId: string,
    @Req() request:Express.Request
  ) {
    const userId = request.user.userId
    return this.bookingService.cancelBooking(bookingId , userId);
  }
}
