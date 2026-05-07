import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from '../../domain/repositories/project.repository';
import { PROJECT_REPOSITORY } from '../../infrastructure/tokens/project.tokens';

@Injectable()
export class GetProjectBySlugUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly repository: ProjectRepository,
  ) {}

  execute = async (slug: string) => {
    const project = await this.repository.findBySlug(slug);

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  };
}
