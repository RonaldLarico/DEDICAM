import { IsEnum } from 'class-validator';
import { ProjectVisibility } from '@prisma/client';

export class UpdateProjectVisibilityDto {
  @IsEnum(ProjectVisibility)
  visibility!: ProjectVisibility;
}
