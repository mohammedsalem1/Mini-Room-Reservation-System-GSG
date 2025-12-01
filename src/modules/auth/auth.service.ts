import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto, RegisterDto, UserResponseDto } from './dto/auth.dto';
import { DatabaseService } from '../database/database.service';
import { UserService } from '../user/user.service';
import argon from 'argon2'
import { removeFields } from 'src/utils/object.utils';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'generated/prisma';

@Injectable()
export class AuthService {
  constructor(
    private userService:UserService,
    private jwtService:JwtService
  ) {}
  async register(registerDto: RegisterDto):Promise<UserResponseDto> {
    const foundUser = await this.userService.findByEmail(registerDto.userEmail)
    if (foundUser){
        throw new ConflictException("the user is exist")
    }
    const hashedPassword = await this.hashPassword(registerDto.userPassword);

    const createUser = await this.userService.
    create({...registerDto , userPassword:hashedPassword})
    
    const jwtToken  = this.generateJwtToken(createUser.userId , createUser.userRole)  

    return {
       user : removeFields(createUser , ['userPassword']) , 
       token:jwtToken
    }

  }
  async login(loginDto: LoginDto):Promise<UserResponseDto> {
    const foundUser = await this.userService
     .findByEmail(loginDto.userEmail)

    if (!foundUser){
        throw new UnauthorizedException("the user is not found")
    }
    if (foundUser.isDeleted) {
        throw new UnauthorizedException("Your account has been deleted")
    }
    const isPasswordValid = await this.verifyPassword(
      loginDto.userPassword , 
      foundUser.userPassword
    )
    if (!isPasswordValid) {
       throw new UnauthorizedException("Invalid credential")
    }
    const token =  this.generateJwtToken(
      foundUser.userId ,
      foundUser.userRole
    )

    return {
      user : removeFields(foundUser , ['userPassword']),
      token
    }
  }
 hashPassword(userPassword:string) {
   return argon.hash(userPassword)
  }
  private async verifyPassword(userPassword:string , hashPassword:string) {
   return argon.verify(hashPassword , userPassword)
 }
   private generateJwtToken(userId:string , userRole:UserRole) {
   return this.jwtService.sign(
    {sub:userId , userRole} , 
    {expiresIn:'30d'})
 }
}
