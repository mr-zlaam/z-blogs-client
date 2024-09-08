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
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutMiddleware = exports.ifUser = exports.ifUserIsModerator_OR_Admin = exports.ifUserIsAdmin = exports.CheckToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
const CONSTANTS_1 = require("../CONSTANTS");
const asynhandlerUtil_1 = require("../utils/asynhandlerUtil");
const db_1 = require("../db");
// Check if user have token
exports.CheckToken = (0, asynhandlerUtil_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header("Authorization");
    if (!token)
        throw { status: CONSTANTS_1.BAD_REQUEST, message: "unable to find any token" };
    // check if user is there
    const parsedToken = (token === null || token === void 0 ? void 0 : token.split(" ")[1]) || "";
    let decodedToken;
    try {
        decodedToken = (0, jsonwebtoken_1.verify)(parsedToken, config_1.JWT_SECRET_KEY);
    }
    catch (error) {
        throw { status: 400, message: "invalid token" };
    }
    const user = (yield db_1.prisma.user.findUnique({
        where: { uid: decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.uid },
    }));
    if (!user)
        throw { status: 400, message: "user not found (middleware check check)" };
    if (decodedToken.tokenVersion !== (user === null || user === void 0 ? void 0 : user.tokenVersion))
        throw {
            status: 400,
            message: "Your login session expired. Please login again (middleware check check)",
        };
    req.userFromToken = decodedToken;
    req.userFromDB = user && user;
    next();
}));
exports.ifUserIsAdmin = (0, asynhandlerUtil_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (((_a = req.userFromToken) === null || _a === void 0 ? void 0 : _a.role) !== "ADMIN") {
        throw {
            status: CONSTANTS_1.UNAUTHORIZED,
            message: "Only admin can modify this data (check from admin middleware)",
        };
    }
    if (!((_b = req.userFromDB) === null || _b === void 0 ? void 0 : _b.isVerfied)) {
        throw {
            status: CONSTANTS_1.UNAUTHORIZED,
            message: "Admin is not verified",
        };
    }
    next();
}));
// For moderator who can only write the data
exports.ifUserIsModerator_OR_Admin = (0, asynhandlerUtil_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    if (((_a = req.userFromToken) === null || _a === void 0 ? void 0 : _a.role) !== "ADMIN" &&
        ((_b = req.userFromToken) === null || _b === void 0 ? void 0 : _b.role) !== "MODERATOR")
        throw {
            status: CONSTANTS_1.UNAUTHORIZED,
            message: "Only Admin or moderator can modify this data",
        };
    if (!((_c = req.userFromDB) === null || _c === void 0 ? void 0 : _c.isVerfied)) {
        throw {
            status: CONSTANTS_1.UNAUTHORIZED,
            message: " Moderator  is not verified",
        };
    }
    next();
}));
// If user is not login
exports.ifUser = (0, asynhandlerUtil_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (((_a = req.userFromToken) === null || _a === void 0 ? void 0 : _a.role) !== "USER")
        throw { status: CONSTANTS_1.UNAUTHORIZED, message: "you are not logged in" };
    next();
}));
exports.logoutMiddleware = (0, asynhandlerUtil_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header("Authorization");
    if (!token) {
        throw {
            status: CONSTANTS_1.UNAUTHORIZED,
            message: "User is not login",
        };
    }
    let decodedToken;
    const parsedToken = (token === null || token === void 0 ? void 0 : token.split(" ")[1]) || "";
    try {
        decodedToken = (0, jsonwebtoken_1.verify)(parsedToken, config_1.JWT_SECRET_KEY);
    }
    catch (error) {
        console.log("Token is not valid");
    }
    if (decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.uid) {
        const user = yield db_1.prisma.user.findUnique({
            where: { uid: decodedToken.uid },
        });
        if (user)
            return next();
        else {
            throw {
                status: CONSTANTS_1.UNAUTHORIZED,
                message: "User is not real",
            };
        }
    }
    next();
}));
