"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const node_1 = __importDefault(require("parse/node"));
class AuthService {
    // LOGIN
    async login({ usernameOrEmail, password, }) {
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usernameOrEmail);
        let user;
        if (isEmail) {
            const query = new node_1.default.Query(node_1.default.User);
            query.equalTo("email", usernameOrEmail);
            user = await query.first({ useMasterKey: true });
            if (!user) {
                throw new node_1.default.Error(node_1.default.Error.EMAIL_NOT_FOUND, "User not found with this email");
            }
        }
        else {
            const query = new node_1.default.Query(node_1.default.User);
            query.equalTo("username", usernameOrEmail);
            user = await query.first({ useMasterKey: true });
            if (!user) {
                throw new node_1.default.Error(node_1.default.Error.USERNAME_MISSING, "User not found with this username");
            }
        }
        const loggedInUser = await node_1.default.User.logIn(user.get("username"), password);
        return loggedInUser;
    }
    // SIGNUP
    async signUp({ username, email, password, }) {
        const user = new node_1.default.User({ useMasterKey: true });
        user.set("username", username);
        user.set("email", email);
        user.set("password", password);
        await user.signUp(null, { useMasterKey: true });
    }
}
exports.AuthService = AuthService;
