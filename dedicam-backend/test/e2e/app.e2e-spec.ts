import { TestContext } from '../support/test-context';

describe('APP E2E BOOTSTRAP CHECK', () => {
  it('should have application initialized', () => {
    expect(TestContext.app).toBeDefined();
  });

  it('should be able to access HTTP server', () => {
    const app = TestContext.app?.getHttpServer();

    expect(app).toBeDefined();
  });
});
