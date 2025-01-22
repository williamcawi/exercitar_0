import Parse from "parse";
import { AuthRepository } from "../repository/auth_repository";
import { AuthService } from "../service/auth_service";

Parse.Cloud.define("login", async (request) => {
  const { usernameOrEmail, password } = request.params;

  return await new AuthRepository(new AuthService()).login({
    usernameOrEmail,
    password,
  });
});
