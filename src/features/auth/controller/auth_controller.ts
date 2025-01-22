import Parse from "parse/node";
import { AuthRepository } from "../repository/auth_repository";
import { AuthService } from "../service/auth_service";

const authRepository = new AuthRepository(new AuthService());

Parse.Cloud.define("login", async (request) => {
  const { usernameOrEmail, password } = request.params;

  return await authRepository.login({
    usernameOrEmail: usernameOrEmail,
    password: password,
  });
});

Parse.Cloud.define("signUp", async (request) => {
  const { username, email, password } = request.params;

  return await authRepository.signUp({
    username: username,
    email: email,
    password: password,
  });
});
