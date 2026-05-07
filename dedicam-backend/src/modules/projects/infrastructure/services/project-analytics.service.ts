import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectAnalyticsService {
  registerView = async (projectId: number) => {
    return {
      success: true,
      projectId,
    };
  };
}
