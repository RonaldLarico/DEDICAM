import { Project } from '@prisma/client';
import { ProjectEntity } from '../../domain/entities/project.entity';

export class ProjectPrismaMapper {
  static toDomain = (project: Project): ProjectEntity => {
    return {
      id: project.id,
      title: project.title,
      slug: project.slug,
      description: project.description || undefined,
      visibility: project.visibility as any,
      status: project.status as any,
      isPremium: project.isPremium,
      allowComments: project.allowComments,
      allowDownload: project.allowDownload,
      settings: project.settings as any,
      currentSceneId: project.currentSceneId || undefined,
      publishedVersionId: project.publishedVersionId || undefined,
      analyticsId: project.analyticsId || undefined,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      ownerId: project.ownerId,
      templateId: project.templateId || undefined,
      thumbnailAssetId: project.thumbnailAssetId || undefined,
    };
  };
}
