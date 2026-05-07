import request from 'supertest';

export class TestHelpers {
  static async login(
    app: any,
    email: string,
    password: string,
  ): Promise<string> {
    const httpServer = app.getHttpServer();

    const res = await request(httpServer)
      .post('/auth/login')
      .send({ email, password });

    const token =
      res.body.access_token || res.body.token || res.body.accessToken;

    if (!token) {
      throw new Error(`Login failed: ${JSON.stringify(res.body)}`);
    }

    return token;
  }

  static async safeDeleteUser(app: any, token: string, id: number) {
    const httpServer = app.getHttpServer();

    try {
      await request(httpServer)
        .delete(`/users/${id}`)
        .set('Authorization', `Bearer ${token}`);
    } catch {
      // ignore
    }
  }
}
