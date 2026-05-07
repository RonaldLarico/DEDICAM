import { Test } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { TestContext } from '../support/test-context';
import { prisma } from '../../src/lib/prisma';

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleRef.createNestApplication();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.init();

  // guardar app global
  TestContext.app = app;
});

afterAll(async () => {
  // cerrar prisma
  await prisma.$disconnect();

  // cerrar nest
  if (TestContext.app) {
    await TestContext.app.close();
  }
});
