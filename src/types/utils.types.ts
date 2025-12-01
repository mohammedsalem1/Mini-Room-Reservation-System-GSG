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