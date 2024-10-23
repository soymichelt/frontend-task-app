import { User } from '@angular/fire/auth';
import { faker } from '@faker-js/faker';

export class UserMock {
  public static buildUser(): User {
    return {
      uid: faker.string.uuid(),
      email: faker.internet.email(),
      displayName: faker.person.fullName(),
      emailVerified: faker.datatype.boolean(),
      isAnonymous: false,
    } as User;
  }
}
