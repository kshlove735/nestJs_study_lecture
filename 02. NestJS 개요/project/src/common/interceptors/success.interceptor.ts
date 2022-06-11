import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    //map의 인자인 data는 controller에서 return 받은 데이터
    return next.handle().pipe(
      map((data) => ({
        success: true,
        data,
      })),
    );
  }
}
