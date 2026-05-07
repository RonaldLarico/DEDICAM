import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectThumbnailService {
  generateThumbnail = async (projectId: number) => {
    return {
      success: true,
      projectId,
    };
  };
}
