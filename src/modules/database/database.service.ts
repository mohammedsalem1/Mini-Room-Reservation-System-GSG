import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import { skip } from 'node:test';
import { PaginationQueryType, PaginationResultMeta } from 'src/types/utils.types';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit{    
    constructor(){
      super({log:['query' , 'info' , 'warn' , 'error']})
    }
    async onModuleInit() {
     await this.$connect()
      console.log('Connected database ❤')
  }

  handleQueryPagination(query:PaginationQueryType) {
    const page  = Number(query.page?? 1);
    const limit = Number(query.limit ?? 10)
    return {skip:(page - 1) * limit  ,  take:limit}
  }
  formatePaginationResult(args:{
    page:number , 
    limit:number , 
    count:number
  }):PaginationResultMeta{
    return {
         meta :{
             total:args.count , 
             page :args.page , 
             limit:args.limit , 
             totalPage:Math.ceil(args.count/args.limit)
         }
    }
  }
}
