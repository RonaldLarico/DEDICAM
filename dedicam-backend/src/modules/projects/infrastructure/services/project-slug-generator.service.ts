import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

@Injectable()
export class ProjectSlugGeneratorService {
  generate = (title: string): string => {
    return slugify(title, {
      lower: true,
      strict: true,
      trim: true,
    });
  };
}
