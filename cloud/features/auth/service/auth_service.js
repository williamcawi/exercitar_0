"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const parse_1 = __importDefault(require("parse"));
class AuthService {
    async login({ usernameOrEmail, password, }) {
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usernameOrEmail);
        let user;
        if (isEmail) {
            const query = new parse_1.default.Query(parse_1.default.User);
            query.equalTo("email", usernameOrEmail);
            user = await query.first({ useMasterKey: true });
            if (!user) {
                throw new parse_1.default.Error(parse_1.default.Error.EMAIL_NOT_FOUND, "User not found with this email");
            }
        }
        else {
            const query = new parse_1.default.Query(parse_1.default.User);
            query.equalTo("username", usernameOrEmail);
            user = await query.first({ useMasterKey: true });
            if (!user) {
                throw new parse_1.default.Error(parse_1.default.Error.USERNAME_MISSING, "User not found with this username");
            }
        }
        const loggedInUser = await parse_1.default.User.logIn(user.get("username"), password);
        return loggedInUser;
    }
}
exports.AuthService = AuthService;
