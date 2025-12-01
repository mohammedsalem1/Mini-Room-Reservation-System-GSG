import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from 'generated/prisma';

export class CreateBookingDto {
  @ApiProperty({ description: "the roomId", example: "1" })
  roomId: string;

  @ApiProperty({ description: "the checkIn", example: "2025-12-10" })
  checkIn: string;

  @ApiProperty({ description: "the checkOut", example: "2025-12-11" })
  checkOut: string;
}
export type BookingRoomResponseDto = Prisma.BookingGetPayload<{
    include:{room:true , user:true}
}>
