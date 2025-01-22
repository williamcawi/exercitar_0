import Parse from "parse";
import { AuthService } from "../service/auth_service";

export class AuthRepository {
  constructor(private authService: AuthService) {}

  async login({
    usernameOrEmail,
    password,
  }: {
    usernameOrEmail: string;
    password: string;
  }) {
    try {
      const loggedInUser = await this.authService.login({
        usernameOrEmail,
        password,
      });
      return {
        sessionToken: loggedInUser.getSessionToken(),
        message: "Success to login",
      };
    } catch (error) {
      const message =
        error instanceof Error || error instanceof Parse.Error
          ? error.message
          : "Unknown error server";
      throw new Parse.Error(Parse.Error.INTERNAL_SERVER_ERROR, message);
    }
  }
}
