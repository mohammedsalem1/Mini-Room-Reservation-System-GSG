import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RegisterDto } from '../auth/dto/auth.dto';

@Injectable()
export class UserService {
  constructor(
    private prismaService:DatabaseService
  ){}
  create(registerDto: RegisterDto) {
    return this.prismaService.user.create({
      data: registerDto
    });
  }

  findAll() {
    return `This action returns all user`;
  }
   
  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: string) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
  async findByEmail(userEmail:string) {
    return await this.prismaService.user.findUnique({where:{userEmail}})
  }
}
