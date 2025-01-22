"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __importDefault(require("parse/node"));
const auth_repository_1 = require("../repository/auth_repository");
const auth_service_1 = require("../service/auth_service");
const authRepository = new auth_repository_1.AuthRepository(new auth_service_1.AuthService());
node_1.default.Cloud.define("login", async (request) => {
    const { usernameOrEmail, password } = request.params;
    return await authRepository.login({
        usernameOrEmail: usernameOrEmail,
        password: password,
    });
});
node_1.default.Cloud.define("signUp", async (request) => {
    const { username, email, password } = request.params;
    return await authRepository.signUp({
        username: username,
        email: email,
        password: password,
    });
});
