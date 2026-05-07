import { Inject, Injectable } from '@nestjs/common';
import { ProjectRepository } from '../../domain/repositories/project.repository';
import { PROJECT_REPOSITORY } from '../../infrastructure/tokens/project.tokens';

@Injectable()
export class GetMyProjectsUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly repository: ProjectRepository,
  ) {}

  execute = async (ownerId: number) => {
    return this.repository.findManyByOwner(ownerId);
  };
}
