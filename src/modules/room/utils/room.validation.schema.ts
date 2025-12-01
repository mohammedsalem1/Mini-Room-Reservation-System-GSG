import z, { ZodType } from "zod";
import { CreateRoomDto } from "../dto/room.dto";

export const createRoomValidationSchema = z.object({
   roomName : z.string(),
   roomPrice : z.number(),
   roomCapacity:z.number()
}) satisfies ZodType<CreateRoomDto>

export const updateRoomValidationSchema = createRoomValidationSchema.pick({
   roomCapacity:true,
   roomName:true,
   roomPrice:true
}).partial()
