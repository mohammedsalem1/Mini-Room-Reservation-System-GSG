import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";

export class CreateRoomDto {
    @ApiProperty({
        description: "Name of the room",
        example: "Luxury Suite",
        required: true,
        type: String,
    })
    roomName: string;

    @ApiProperty({
        description: "Price per night for the room",
        example: 150.75,
        required: true,
        type: Number,
    })
    roomPrice: number;

    @ApiProperty({
        description: "Maximum capacity of the room",
        example: 3,
        required: true,
        type: Number,
    })
    roomCapacity: number;
}
export class UpdateRoomDto extends PartialType(CreateRoomDto) {}

export class RoomFilterDto {
  @ApiPropertyOptional({ example: '2025-12-10' })
  checkIn?: string;

  @ApiPropertyOptional({ example: '2025-12-15' })
  checkOut?: string;

  @ApiPropertyOptional({ example: 100 })
  minPrice?: number;

  @ApiPropertyOptional({ example: 500 })
  maxPrice?: number;

  @ApiPropertyOptional({ example: 2 })
  minCapacity?: number;

  @ApiPropertyOptional({ example: 10 })
  maxCapacity?: number;

}


