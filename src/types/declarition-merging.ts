import { env } from "process";
import { UserResponseDto } from "src/modules/auth/dto/auth.dto";
export type EnvVariables =  {
    JWT_SECRET:string
    NODE_ENV:'development' | 'production'
}
declare global {
     namespace NodeJS {
        interface ProcessEnv extends EnvVariables {}
     }
     namespace Express {
        interface Request {
          user: UserResponseDto['user']
     } 
     }
     
}