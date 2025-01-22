import Parse from "parse/node";
import { AuthService } from "../service/auth_service";

export class AuthRepository {
  constructor(private authService: AuthService) {}

  // LOGIN
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

  // SIGNUP
  async signUp({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) {
    try {
      await this.authService.signUp({
        username: username,
        email: email,
        password: password,
      });
      return {
        message: "Success to register a new user",
      };
    } catch (error) {
      const message: string =
        error instanceof Error || error instanceof Parse.Error
          ? error.message
          : "an unknown error server";
      throw new Parse.Error(Parse.Error.INTERNAL_SERVER_ERROR, message);
    }
  }
}
