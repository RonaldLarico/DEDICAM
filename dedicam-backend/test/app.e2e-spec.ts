import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('USERS E2E DEFENSIVE TEST', () => {
  let app: INestApplication;

  let accessToken: string;
  let createdUserId: number;

  /////////////////////////////////////////////////////
  // SETUP
  /////////////////////////////////////////////////////

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();

    /////////////////////////////////////////////////////
    // LOGIN REAL
    /////////////////////////////////////////////////////

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'super_admin@test.com',
        password: 'admin_1234',
      });

    accessToken =
      loginResponse.body.accessToken || loginResponse.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  /////////////////////////////////////////////////////
  // CREATE USER SUCCESS
  /////////////////////////////////////////////////////

  it('POST /users -> should create user', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        email: `test${Date.now()}@test.com`,
        password: '123456',
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');

    expect(response.body).toHaveProperty('email');

    expect(response.body).not.toHaveProperty('password');

    createdUserId = response.body.id;
  });

  /////////////////////////////////////////////////////
  // DUPLICATED EMAIL
  /////////////////////////////////////////////////////

  it('POST /users -> should return 409 if email exists', async () => {
    const email = `duplicate${Date.now()}@test.com`;

    await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        email,
        password: '123456',
      });

    await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        email,
        password: '123456',
      })
      .expect(409);
  });

  /////////////////////////////////////////////////////
  // INVALID EMAIL
  /////////////////////////////////////////////////////

  it('POST /users -> should return 400 invalid email', async () => {
    await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        email: `invalid-${Date.now()}`,
        password: '123456',
      })
      .expect(400);
  });

  /////////////////////////////////////////////////////
  // NO TOKEN
  /////////////////////////////////////////////////////

  it('GET /users -> should return 401 without token', async () => {
    await request(app.getHttpServer()).get('/users').expect(401);
  });

  /////////////////////////////////////////////////////
  // INVALID TOKEN
  /////////////////////////////////////////////////////

  it('GET /users -> should return 401 invalid token', async () => {
    await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', 'Bearer invalid-token')
      .expect(401);
  });

  /////////////////////////////////////////////////////
  // GET USERS SUCCESS
  /////////////////////////////////////////////////////

  it('GET /users -> should return users array', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  /////////////////////////////////////////////////////
  // GET USER BY ID SUCCESS
  /////////////////////////////////////////////////////

  it('GET /users/:id -> should return user', async () => {
    const response = await request(app.getHttpServer())
      .get(`/users/${createdUserId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body.id).toBe(createdUserId);
  });

  /////////////////////////////////////////////////////
  // USER NOT FOUND
  /////////////////////////////////////////////////////

  it('GET /users/:id -> should return 404', async () => {
    await request(app.getHttpServer())
      .get('/users/999999')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(404);
  });

  /////////////////////////////////////////////////////
  // UPDATE USER SUCCESS
  /////////////////////////////////////////////////////

  it('PUT /users/:id -> should update user', async () => {
    const response = await request(app.getHttpServer())
      .put(`/users/${createdUserId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        firstName: 'Ronald',
      })
      .expect(200);

    expect(response.body.updatedUser.firstName).toBe('Ronald');
  });

  /////////////////////////////////////////////////////
  // UPDATE USER NOT FOUND
  /////////////////////////////////////////////////////

  it('PUT /users/:id -> should return 404', async () => {
    await request(app.getHttpServer())
      .put('/users/999999')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        firstName: 'Test',
      })
      .expect(404);
  });

  /////////////////////////////////////////////////////
  // DELETE USER SUCCESS
  /////////////////////////////////////////////////////

  it('DELETE /users/:id -> should delete user', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/users/${createdUserId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body.id).toBe(createdUserId);
  });

  /////////////////////////////////////////////////////
  // DELETE USER NOT FOUND
  /////////////////////////////////////////////////////

  it('DELETE /users/:id -> should return 404', async () => {
    await request(app.getHttpServer())
      .delete('/users/999999')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(404);
  });
});
