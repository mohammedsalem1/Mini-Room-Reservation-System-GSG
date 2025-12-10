import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { PaginationResult, UnifiedApiResponse } from "src/types/utils.types";
import { date, success } from "zod";

@Injectable()
export class ResponseInterceptor<T extends Record<string, unknown>> implements NestInterceptor {
     
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<UnifiedApiResponse<T>> {             
         console.log("Before")
         return next.handle()
         .pipe(
            map((data:PaginationResult<T> | T) => {
                console.log('After')
                if (isPaginationResponse<T>(data)) {
                    return {
                        success:true , 
                        ...data
                    }
                }
               return { success:true , data }
            })
         )

    }
}
export const isPaginationResponse = <T>(
      data:Record<string , unknown>
    ): data is PaginationResult<T> => {
      return data 
        && typeof data === 'object'
        && 'data' in data
        && 'meta' in data
    }