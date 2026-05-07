import { INestApplication } from '@nestjs/common';

export class TestContext {
  static app: INestApplication | null = null;
}
