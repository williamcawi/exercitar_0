"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const node_1 = __importDefault(require("parse/node"));
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
            const message = error instanceof Error || error instanceof node_1.default.Error
                ? error.message
                : "Unknown error server";
            throw new node_1.default.Error(node_1.default.Error.INTERNAL_SERVER_ERROR, message);
        }
    }
}
exports.AuthRepository = AuthRepository;
