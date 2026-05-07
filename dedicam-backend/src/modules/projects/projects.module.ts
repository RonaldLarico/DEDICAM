import { Module } from '@nestjs/common';
import { PrismaService } from '../../shared/infrastructure/prisma/prisma.service';
import { ProjectsController } from './presentation/controllers/projects.controller';
import { CreateProjectUseCase } from './application/use-cases/create-project.use-case';
import { DeleteProjectUseCase } from './application/use-cases/delete-project.use-case';
import { GetMyProjectsUseCase } from './application/use-cases/get-my-project.use-case';
import { GetProjectBySlugUseCase } from './application/use-cases/get-project-by-slug.use-case';
import { PublishProjectUseCase } from './application/use-cases/publish-project.use-case';
import { UpdateProjectUseCase } from './application/use-cases/update-project.use-case';
import { UpdateProjectVisibilityUseCase } from './application/use-cases/update-project-visibility.use-case';
import { SlugService } from './application/services/slug.service';
import { PrismaProjectRepository } from './infrastructure/repositories/prisma-project.repository';
import { ProjectAnalyticsService } from './infrastructure/services/project-analytics.service';
import { ProjectSlugGeneratorService } from './infrastructure/services/project-slug-generator.service';
import { ProjectThumbnailService } from './infrastructure/services/project-thumbnail.service';
import {
  PROJECT_ANALYTICS_SERVICE,
  PROJECT_REPOSITORY,
  PROJECT_SLUG_SERVICE,
  PROJECT_THUMBNAIL_SERVICE,
} from './infrastructure/tokens/project.tokens';

@Module({
  controllers: [ProjectsController],

  providers: [
    PrismaService,
    SlugService,
    CreateProjectUseCase,
    DeleteProjectUseCase,
    GetMyProjectsUseCase,
    GetProjectBySlugUseCase,
    PublishProjectUseCase,
    UpdateProjectUseCase,
    UpdateProjectVisibilityUseCase,
    {
      provide: PROJECT_REPOSITORY,
      useClass: PrismaProjectRepository,
    },
    {
      provide: PROJECT_ANALYTICS_SERVICE,
      useClass: ProjectAnalyticsService,
    },
    {
      provide: PROJECT_SLUG_SERVICE,
      useClass: ProjectSlugGeneratorService,
    },
    {
      provide: PROJECT_THUMBNAIL_SERVICE,
      useClass: ProjectThumbnailService,
    },
  ],

  exports: [
    PROJECT_REPOSITORY,
    PROJECT_ANALYTICS_SERVICE,
    PROJECT_SLUG_SERVICE,
    PROJECT_THUMBNAIL_SERVICE,
  ],
})
export class ProjectsModule {}
