import Parse from "parse";

export class AuthService {
  async login({
    usernameOrEmail,
    password,
  }: {
    usernameOrEmail: string;
    password: string;
  }): Promise<Parse.User<Parse.Attributes>> {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usernameOrEmail);

    let user;
    if (isEmail) {
      const query = new Parse.Query(Parse.User);
      query.equalTo("email", usernameOrEmail);
      user = await query.first({ useMasterKey: true });
      if (!user) {
        throw new Parse.Error(
          Parse.Error.EMAIL_NOT_FOUND,
          "User not found with this email"
        );
      }
    } else {
      const query = new Parse.Query(Parse.User);
      query.equalTo("username", usernameOrEmail);
      user = await query.first({ useMasterKey: true });
      if (!user) {
        throw new Parse.Error(
          Parse.Error.USERNAME_MISSING,
          "User not found with this username"
        );
      }
    }

    const loggedInUser = await Parse.User.logIn(user.get("username"), password);
    return loggedInUser;
  }
}
