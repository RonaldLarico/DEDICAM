import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { ProjectRepository } from '../../domain/repositories/project.repository';
import { CreateProjectDto } from '../dto/create-project.dto';
import { SlugService } from '../services/slug.service';
import {
  PROJECT_REPOSITORY,
  PROJECT_SLUG_SERVICE,
} from '../../infrastructure/tokens/project.tokens';

@Injectable()
export class CreateProjectUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly repository: ProjectRepository,

    @Inject(PROJECT_SLUG_SERVICE)
    private readonly slugService: SlugService,
  ) {}

  execute = async (dto: CreateProjectDto, ownerId: number) => {
    const slug = this.slugService.generate(dto.title);

    const existing = await this.repository.findBySlug(slug);

    if (existing) {
      throw new ConflictException('Project slug already exists');
    }

    return this.repository.create({
      title: dto.title,
      slug,
      description: dto.description,
      visibility: dto.visibility,
      allowComments: dto.allowComments,
      allowDownload: dto.allowDownload,
      isPremium: dto.isPremium,
      templateId: dto.templateId,
      ownerId,
    });
  };
}
