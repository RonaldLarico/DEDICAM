import { ProjectStatusEnum } from '../enums/project-status.enum';
import { ProjectVisibilityEnum } from '../enums/project-visibility.enum';

export class ProjectEntity {
  id!: number;
  title!: string;
  slug!: string;
  description?: string;
  visibility!: ProjectVisibilityEnum;
  status!: ProjectStatusEnum;
  isPremium!: boolean;
  allowComments!: boolean;
  allowDownload!: boolean;
  settings?: Record<string, any>;
  currentSceneId?: string;
  publishedVersionId?: string;
  analyticsId?: string;
  createdAt!: Date;
  updatedAt!: Date;
  ownerId!: number;
  templateId?: number;
  thumbnailAssetId?: number;
}
