"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const parse_1 = __importDefault(require("parse"));
class AuthRepository {
    constructor(authService) {
        this.authService = authService;
    }
    async login({ usernameOrEmail, password, }) {
        try {
            const loggedInUser = await this.authService.login({
                usernameOrEmail,
                password,
            });
            return {
                sessionToken: loggedInUser.getSessionToken(),
                message: "Success to login",
            };
        }
        catch (error) {
            const message = error instanceof Error || error instanceof parse_1.default.Error
                ? error.message
                : "Unknown error server";
            throw new parse_1.default.Error(parse_1.default.Error.INTERNAL_SERVER_ERROR, message);
        }
    }
}
exports.AuthRepository = AuthRepository;
