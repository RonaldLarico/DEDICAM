import { Prisma, Project } from '@prisma/client';

export abstract class ProjectRepository {
  abstract create: (data: Prisma.ProjectUncheckedCreateInput) => Promise<Project>;

  abstract findById: (id: number) => Promise<Project | null>;

  abstract findBySlug: (slug: string) => Promise<Project | null>;

  abstract findManyByOwner: (ownerId: number) => Promise<Project[]>;

  abstract update: (
    id: number,

    data: Prisma.ProjectUncheckedUpdateInput,
  ) => Promise<Project>;

  abstract delete: (id: number) => Promise<void>;
}
