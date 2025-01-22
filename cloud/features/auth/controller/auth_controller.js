"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parse_1 = __importDefault(require("parse"));
const auth_repository_1 = require("../repository/auth_repository");
const auth_service_1 = require("../service/auth_service");
parse_1.default.Cloud.define("login", async (request) => {
    const { usernameOrEmail, password } = request.params;
    return await new auth_repository_1.AuthRepository(new auth_service_1.AuthService()).login({
        usernameOrEmail,
        password,
    });
});
