import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProjectStatus } from '@prisma/client';
import { ProjectRepository } from '../../domain/repositories/project.repository';
import { PROJECT_REPOSITORY } from '../../infrastructure/tokens/project.tokens';

@Injectable()
export class PublishProjectUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly repository: ProjectRepository,
  ) {}

  async execute(id: number, ownerId: number) {
    const project = await this.repository.findById(id);

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    if (project.ownerId !== ownerId) {
      throw new ForbiddenException('You are not the owner of this project');
    }

    return this.repository.update(id, {
      status: ProjectStatus.PUBLISHED,
    });
  }
}
