import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import {JwtModule, JwtService} from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config';
import { EnvVariables } from 'src/types/declarition-merging';
@Module({
  imports:[
    UserModule , 
     JwtModule.registerAsync({
      global:true,
      useFactory:(configService:ConfigService<EnvVariables>) => ({
         secret: configService.getOrThrow('JWT_SECRET')
      }),
      inject:[ConfigService]
     })
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
