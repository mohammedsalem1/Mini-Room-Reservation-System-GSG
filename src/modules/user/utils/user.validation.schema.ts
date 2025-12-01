import { RegisterDto } from "src/modules/auth/dto/auth.dto";
import z, { ZodType } from "zod";

export const userValidationSchema = z.object({
   userName : z.string().min(2).max(100) , 
   userEmail: z.string().toLowerCase(),
   userPassword:z.string().min(8),
   userRole:z.enum(['OWNER' , 'GUEST' , 'ADMIN'])
}) satisfies ZodType<RegisterDto>



