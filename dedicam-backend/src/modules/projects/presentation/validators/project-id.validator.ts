import { BadRequestException, PipeTransform } from '@nestjs/common';

export class ProjectIdValidator implements PipeTransform {
  transform = (value: string) => {
    const parsed = Number(value);

    if (isNaN(parsed)) {
      throw new BadRequestException('Invalid project id');
    }

    return parsed;
  };
}
