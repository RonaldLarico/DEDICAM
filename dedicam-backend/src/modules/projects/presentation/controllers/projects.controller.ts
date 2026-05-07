import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../../../../modules/auth/infrastructure/guards/jwt-auth.guard';
import { CreateProjectDto } from '../../application/dto/create-project.dto';
import { UpdateProjectDto } from '../../application/dto/update-project.dto';
import { UpdateProjectVisibilityDto } from '../../application/dto/update-project-visibility.dto';
import { CreateProjectUseCase } from '../../application/use-cases/create-project.use-case';
import { DeleteProjectUseCase } from '../../application/use-cases/delete-project.use-case';
import { GetMyProjectsUseCase } from '../../application/use-cases/get-my-project.use-case';
import { GetProjectBySlugUseCase } from '../../application/use-cases/get-project-by-slug.use-case';
import { PublishProjectUseCase } from '../../application/use-cases/publish-project.use-case';
import { UpdateProjectUseCase } from '../../application/use-cases/update-project.use-case';
import { UpdateProjectVisibilityUseCase } from '../../application/use-cases/update-project-visibility.use-case';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly createProjectUseCase: CreateProjectUseCase,
    private readonly getMyProjectsUseCase: GetMyProjectsUseCase,
    private readonly getProjectBySlugUseCase: GetProjectBySlugUseCase,
    private readonly updateProjectUseCase: UpdateProjectUseCase,
    private readonly deleteProjectUseCase: DeleteProjectUseCase,
    private readonly publishProjectUseCase: PublishProjectUseCase,
    private readonly updateProjectVisibilityUseCase: UpdateProjectVisibilityUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body()
    dto: CreateProjectDto,

    @Req()
    req,
  ) {
    const project = await this.createProjectUseCase.execute(dto, req.user.id);

    return project;
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMine(
    @Req()
    req,
  ) {
    const projects = await this.getMyProjectsUseCase.execute(req.user.id);

    return projects;
  }

  @Get(':slug')
  async findBySlug(
    @Param('slug')
    slug: string,
  ) {
    const project = await this.getProjectBySlugUseCase.execute(slug);

    return project;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    dto: UpdateProjectDto,

    @Req()
    req,
  ) {
    const updatedProject = await this.updateProjectUseCase.execute(
      id,
      dto,
      req.user.id,
    );

    return updatedProject;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe)
    id: number,

    @Req()
    req,
  ) {
    const result = await this.deleteProjectUseCase.execute(id, req.user.id);

    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/publish')
  async publish(
    @Param('id', ParseIntPipe)
    id: number,

    @Req()
    req,
  ) {
    const publishedProject = await this.publishProjectUseCase.execute(
      id,
      req.user.id,
    );

    return publishedProject;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/visibility')
  async updateVisibility(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    dto: UpdateProjectVisibilityDto,

    @Req()
    req,
  ) {
    const updatedVisibility = await this.updateProjectVisibilityUseCase.execute(
      id,
      dto,
      req.user.id,
    );

    return updatedVisibility;
  }
}
