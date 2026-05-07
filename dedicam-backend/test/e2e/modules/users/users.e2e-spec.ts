import request from 'supertest';
import { TestContext } from '../../../support/test-context';
import { UsersSeed } from '../../../seed/users.seed';
import { SuperAdminSeed } from '../../../seed/superadmin.seed';
import { TestHelpers } from '../../../shared/user-test.helpers';

describe('USERS E2E CLEAN ARCHITECTURE', () => {
  let superAdminToken: string;
  let createdUserId: number | undefined;

  const getApp = () => {
    if (!TestContext.app) {
      throw new Error('Nest app no inicializada');
    }
    return TestContext.app.getHttpServer();
  };

  // SETUP (SEED + LOGIN)
  beforeAll(async () => {
    const app = TestContext.app;

    if (!app) {
      throw new Error('TestContext.app no inicializado');
    }

    // SEED SUPER ADMIN
    const superAdmin = await SuperAdminSeed.ensureExists(app);

    // LOGIN
    superAdminToken = await TestHelpers.login(
      app,
      superAdmin.email,
      superAdmin.password,
    );

    // SEED USER BASE
    const user = await UsersSeed.createUser(app, superAdminToken);
    createdUserId = user.id;
  });

  // CLEANUP
  afterAll(async () => {
    const app = TestContext.app;

    if (createdUserId !== undefined) {
      await TestHelpers.safeDeleteUser(app, superAdminToken, createdUserId);
    }
  });

  // CREATE USER
  it('POST /users -> create user', async () => {
    const res = await request(getApp())
      .post('/users')
      .set('Authorization', `Bearer ${superAdminToken}`)
      .send({
        email: `manual_${Date.now()}@test.local`,
        password: 'Test1234!',
        role: 'USER',
      })
      .expect(201);

    expect(res.body.email).toContain('@test.local');
    expect(res.body).not.toHaveProperty('password');
  });

  // LIST USERS
  it('GET /users -> list users', async () => {
    const res = await request(getApp())
      .get('/users')
      .set('Authorization', `Bearer ${superAdminToken}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);

    expect(res.body.some((u: any) => u.id === createdUserId)).toBe(true);
  });

  // GET USER
  it('GET /users/:id', async () => {
    const res = await request(getApp())
      .get(`/users/${createdUserId}`)
      .set('Authorization', `Bearer ${superAdminToken}`)
      .expect(200);

    expect(res.body.id).toBe(createdUserId);
  });

  // UPDATE USER
  it('PUT /users/:id', async () => {
    const res = await request(getApp())
      .put(`/users/${createdUserId}`)
      .set('Authorization', `Bearer ${superAdminToken}`)
      .send({ firstName: 'Ronald' })
      .expect(200);

    expect(res.body.updatedUser.firstName).toBe('Ronald');
  });

  // DELETE USER
  it('DELETE /users/:id', async () => {
    const res = await request(getApp())
      .delete(`/users/${createdUserId}`)
      .set('Authorization', `Bearer ${superAdminToken}`)
      .expect(200);

    expect(res.body.id).toBe(createdUserId);

    createdUserId = undefined;
  });
});
