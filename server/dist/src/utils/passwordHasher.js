"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.passwordHasher = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const apiResponseUtil_1 = require("./apiResponseUtil");
const passwordHasher = (password, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        return hashedPassword;
    }
    catch (error) {
        console.log(error.message);
        return res
            .status(500)
            .json((0, apiResponseUtil_1.apiResponse)(500, error.message || "internal server error while hashing the password"));
    }
});
exports.passwordHasher = passwordHasher;
const verifyPassword = (password, existingPassword, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isPasswordValid = yield bcrypt_1.default.compare(password, existingPassword);
        if (!isPasswordValid)
            throw { status: 403, message: "Invalid Credentials" };
        return isPasswordValid;
    }
    catch (error) {
        return res
            .status(error.status || 500)
            .json((0, apiResponseUtil_1.apiResponse)(error.status || 500, error.message || "Internal server Error while checking credentials"));
    }
});
exports.verifyPassword = verifyPassword;
