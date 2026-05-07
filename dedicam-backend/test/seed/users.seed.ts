import request from 'supertest';
import { UserFactory } from '../factories/users.factory';

export class UsersSeed {
  static async createUser(app: any, token: string) {
    const httpServer = app.getHttpServer();

    const email = UserFactory.email('seed');

    const res = await request(httpServer)
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email,
        password: UserFactory.password(),
        role: 'USER',
      });

    if (res.status !== 201) {
      throw new Error(`Seed createUser failed: ${JSON.stringify(res.body)}`);
    }

    return res.body;
  }

  static async createBulk(app: any, token: string, count = 3) {
    const users: any[] = [];

    for (let i = 0; i < count; i++) {
      const user = await this.createUser(app, token);
      users.push(user);
    }

    return users;
  }
}