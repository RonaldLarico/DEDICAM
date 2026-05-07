import * as bcrypt from 'bcrypt';
import request from 'supertest';
import { prisma } from '../../src/lib/prisma';

export class SuperAdminSeed {
  static async ensureExists(app: any) {
    const httpServer = app.getHttpServer();

    const email = process.env.E2E_SUPERADMIN_EMAIL!;
    const password = process.env.E2E_SUPERADMIN_PASSWORD!;

    // Validación ENV
    if (!email || !password) {
      throw new Error(`
Missing env variables:
E2E_SUPERADMIN_EMAIL=${email}
E2E_SUPERADMIN_PASSWORD=${password}
      `);
    }

    // 1. Intentar login
    const login = await request(httpServer).post('/auth/login').send({
      email,
      password,
    });

    // Usuario ya existe
    if (login.status === 200) {
      return {
        email,
        password,
      };
    }

    // 2. Buscar en DB
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // 3. Crear SUPER_ADMIN
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName: 'Super',
          lastName: 'Admin',
          role: 'SUPER_ADMIN',
        },
      });
    }

    // 4. Login final obligatorio
    const finalLogin = await request(httpServer).post('/auth/login').send({
      email,
      password,
    });

    if (finalLogin.status !== 200) {
      throw new Error(
        `SuperAdmin login failed: ${JSON.stringify(finalLogin.body)}`,
      );
    }

    return {
      email,
      password,
    };
  }
}
