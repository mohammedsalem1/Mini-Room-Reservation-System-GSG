import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RegisterDto } from '../auth/dto/auth.dto';
import { PaginationQueryType } from 'src/types/utils.types';

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

  async findAll(query:PaginationQueryType) {
    const pagination = this.prismaService.handleQueryPagination(query)
        const booking = await this.prismaService.user.findMany({
            where: { isDeleted: false },  
            ...pagination,
});
        const count = await this.prismaService.user.count({
          where:{ isDeleted:false}
        })
        return {
          data:booking,
          ...this.prismaService.formatePaginationResult({
            page:query.page! , 
            limit:pagination.take , 
            count
           }          
          )
        } 
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
