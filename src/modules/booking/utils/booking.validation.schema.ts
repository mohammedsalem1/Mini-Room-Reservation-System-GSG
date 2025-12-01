import z, { ZodType } from "zod";
import { CreateBookingDto } from "../dto/booking.dto";

export const createBookingValidationSchema = z.object({
    roomId:  z.string(),
    checkIn: z.coerce.date() ,
    checkOut:z.coerce.date()  
}) 