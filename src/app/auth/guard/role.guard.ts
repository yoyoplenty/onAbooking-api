import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { User } from '@on/app/user/model/user.model';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    return roles.includes(user.role);
  }
}
