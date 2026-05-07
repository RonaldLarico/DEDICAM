export class UserFactory {
  static email(prefix = 'user') {
    return `${prefix}_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2)}@test.local`;
  }

  static password() {
    return 'Test1234!';
  }
}
