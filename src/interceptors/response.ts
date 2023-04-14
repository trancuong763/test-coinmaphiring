import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { error_code } from 'src/common/error_code.enum';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // TODO: implement transform logic here
    return next.handle().pipe(
      map((response) => {
        return {
          status: HttpStatus.OK,
          code: error_code.SUCCESS,
          msg: 'success',
          data: response ?? [],
        };
      }),
    );
  }
}
