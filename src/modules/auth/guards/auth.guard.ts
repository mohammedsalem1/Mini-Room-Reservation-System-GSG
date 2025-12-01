import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/modules/database/database.service';
import { JwtTokenPayload } from '../types/auth.type';
import { removeFields } from 'src/utils/object.utils';
import { Reflector } from '@nestjs/core';
import { IsPublic } from 'src/decorator/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService:JwtService , 
    private prismaService:DatabaseService ,
    private reflector:Reflector
  ){}
  async canActivate(
    context: ExecutionContext,
  ) {
    const isPublic = this.reflector.getAllAndOverride(IsPublic , [
     context.getHandler(), 
     context.getClass() 
    ])
    if (isPublic) {
       return true
    }
    const request = context.switchToHttp().getRequest<Request>()
    const authHeader = request.headers.authorization
    const jwt = authHeader?.split(' ')[1]
    if (!jwt) {
      throw new UnauthorizedException()
    }
    try {
       const payload = this.jwtService.verify<JwtTokenPayload>(jwt)
       console.log(payload)
       const user = await this.prismaService.user.findUniqueOrThrow({
        where:{userId:payload.sub}
       })
       request.user = removeFields(user , ['userPassword'])
    } catch (error) {
      throw new UnauthorizedException()
    }
    return true;
  }
}
