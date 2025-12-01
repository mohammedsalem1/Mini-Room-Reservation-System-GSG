import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Roles } from 'src/decorator/role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector:Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAllAndOverride(Roles ,
       [context.getHandler() , context.getClass()])
    if(!roles) {
      return true
    }
    const {user} = context.switchToHttp().getRequest<Request>()
    console.log(user)
    if (!roles.includes(user.userRole)) {
      throw new ForbiddenException()
    }   
    return true;
  }
}
