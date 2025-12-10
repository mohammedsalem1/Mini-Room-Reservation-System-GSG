import { HttpStatus } from "@nestjs/common"
import { type } from "os"

export type PaginationQueryType = {
    page? :number,
    limit?:number
}
export type PaginationResultMeta = {
       meta: {
         total:number,
         page:number,
         limit:number ,
         totalPage:number
       } 
}
export type PaginationResult<T> = {
    data:T[], 
 }&PaginationResultMeta

 export type ApiSuccessResponse<T> = {
  success:true, 
  data:T | T[]
 } & Partial<PaginationResultMeta>

 export type ApiErrorResponse = {
  success:false , 
  status:number , 
  timestamp:string
  path:string,
  message:string
  fields?: { field: string; message: string }[];
}

 export type UnifiedApiResponse<T> = ApiSuccessResponse<T>
