import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuditService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  log = async (data: {
    action: string;
    entity: string;
    entityId?: string;

    method?: string;
    route?: string;

    ipAddress?: string;
    userAgent?: string;

    oldValues?: Prisma.InputJsonValue;
    newValues?: Prisma.InputJsonValue;

    userId?: number;
  }) => {
    return this.prisma.auditLog.create({
      data: {
        action: data.action,
        entity: data.entity,
        entityId: data.entityId,

        method: data.method,
        route: data.route,

        ipAddress: data.ipAddress,
        userAgent: data.userAgent,

        oldValues: data.oldValues,
        newValues: data.newValues,

        user: data.userId
          ? {
              connect: {
                id: data.userId,
              },
            }
          : undefined,
      },
    });
  };
}