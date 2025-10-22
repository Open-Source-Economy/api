export class LocalUser {
  email: string;
  isEmailVerified: boolean;
  password: string;

  constructor(email: string, isEmailVerified: boolean, passport: string) {
    this.email = email;
    this.isEmailVerified = isEmailVerified;
    this.password = passport;
  }
}
