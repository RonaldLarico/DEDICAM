import { Injectable } from '@nestjs/common';
import { Prisma, Project } from '@prisma/client';
import { PrismaService } from '../../../../shared/infrastructure/prisma/prisma.service';
import { ProjectRepository } from '../../domain/repositories/project.repository';

@Injectable()
export class PrismaProjectRepository implements ProjectRepository {
  constructor(private readonly prisma: PrismaService) {}

  create = async (data: Prisma.ProjectUncheckedCreateInput): Promise<Project> => {
    return this.prisma.project.create({
      data,
    });
  };

  findById = async (id: number): Promise<Project | null> => {
    return this.prisma.project.findUnique({
      where: { id },

      include: {
        owner: true,
        template: true,
        thumbnailAsset: true,
      },
    });
  };

  findBySlug = async (slug: string): Promise<Project | null> => {
    return this.prisma.project.findUnique({
      where: { slug },

      include: {
        owner: true,
        template: true,
        thumbnailAsset: true,
      },
    });
  };

  findManyByOwner = async (ownerId: number): Promise<Project[]> => {
    return this.prisma.project.findMany({
      where: {
        ownerId,
      },

      orderBy: {
        updatedAt: 'desc',
      },
    });
  };

  update = async (
    id: number,

    data: Prisma.ProjectUncheckedUpdateInput,
  ): Promise<Project> => {
    return this.prisma.project.update({
      where: { id },

      data,
    });
  };

  delete = async (id: number): Promise<void> => {
    await this.prisma.project.delete({
      where: { id },
    });
  };
}
