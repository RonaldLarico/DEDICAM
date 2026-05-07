import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class ProjectOwnerGuard implements CanActivate {
  canActivate = async (context: ExecutionContext): Promise<boolean> => {
    const request = context.switchToHttp().getRequest();

    return !!request.user;
  };
}
