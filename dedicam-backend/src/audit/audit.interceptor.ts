import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, tap } from 'rxjs';
import { AuditService } from './audit.service';

@Injectable()
export class AuditInterceptor
  implements NestInterceptor
{
  constructor(
    private readonly reflector: Reflector,
    private readonly auditService: AuditService,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const request = context
      .switchToHttp()
      .getRequest();

    const user = request.user;

    const action =
      this.reflector.get<string>(
        'audit',
        context.getHandler(),
      );

    if (!action) {
      return next.handle();
    }

    const method = request.method;
    const route = request.url;

    return next.handle().pipe(
      tap((response) => {
        this.auditService.log({
          action,
          entity: this.getEntity(route),

          method,
          route,

          ipAddress: request.ip,
          userAgent:
            request.headers['user-agent'],

          userId: user?.id,

          newValues: response,
        });
      }),
    );
  }

  private getEntity(route: string) {
    if (route.includes('users'))
      return 'User';
    if (route.includes('auth'))
      return 'Auth';
    return 'Unknown';
  }
}