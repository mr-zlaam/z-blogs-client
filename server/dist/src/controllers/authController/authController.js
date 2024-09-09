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
exports.sendOTPcontroller = exports.verifyUserController = exports.getCurrentUserController = exports.searchUserController = exports.updateUserRoleController = exports.updateUserPasswordController = exports.updateUserController = exports.registerUserController = exports.logoutUserController = exports.loginUserController = exports.getSingleUserController = exports.getAllUsersController = exports.deleteUserController = void 0;
const CONSTANTS_1 = require("../../CONSTANTS");
const config_1 = require("../../config");
const db_1 = require("../../db");
const apiResponseUtil_1 = require("../../utils/apiResponseUtil");
const asynhandlerUtil_1 = require("../../utils/asynhandlerUtil");
const passwordHasher_1 = require("../../utils/passwordHasher");
const tokenGenerator_1 = require("../../utils/tokenGenerator");
const slug_and_str_generator_1 = require("../../utils/slug_and_str_generator");
const sendOTP_1 = require("../../utils/sendOTP");
// * Register  User Controller
const registerUserController = (0, asynhandlerUtil_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*
     ********Algo for Registration********
     * Check if the user already exists
     * Hash the password
     * Create a new user
     * Return the user data
     */
    const { username, fullName, email, password } = req.body;
    const isUserExist = yield db_1.prisma.user.findUnique({
        where: { username, email },
    });
    if (isUserExist)
        throw { status: CONSTANTS_1.BAD_REQUEST, message: "user already exists" };
    const isAdmin = config_1.ADMIN_EMAIL === email && config_1.ADMIN_PASSWORD === password;
    const hashedPassword = (yield (0, passwordHasher_1.passwordHasher)(password, res));
    const newUser = yield db_1.prisma.user.create({
        data: {
            username,
            fullName,
            email,
            password: hashedPassword,
            role: isAdmin ? "ADMIN" : "USER",
        },
        select: {
            uid: true,
            username: true,
            fullName: true,
            email: true,
            role: true,
            isVerfied: true,
        },
    });
    const payload = {
        uid: newUser && newUser.uid,
        email: newUser && newUser.email,
        username: newUser && newUser.username,
        fullName: newUser && newUser.fullName,
        role: newUser && newUser.role,
        isVerfied: newUser && newUser.isVerfied,
    };
    const accessToken = (0, tokenGenerator_1.GenerateJWTAccessToken)(payload, res);
    return res
        .status(CONSTANTS_1.OK)
        .json((0, apiResponseUtil_1.apiResponse)(CONSTANTS_1.OK, `${newUser.username || "User"} registered successfully!!`, { newUser, accessToken }));
}));
exports.registerUserController = registerUserController;
// * send otp to user
const sendOTPcontroller = (0, asynhandlerUtil_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // ********
    const { otp: OTP, otpExpiry } = (0, slug_and_str_generator_1.generateOtp)();
    const { email } = req.body;
    if (!email.trim()) {
        throw { status: CONSTANTS_1.BAD_REQUEST, message: "Email is required" };
    }
    const user = yield db_1.prisma.user.update({
        where: { email },
        data: { otp: OTP, otpExpiry },
    });
    yield (0, sendOTP_1.sendOTP)(email, OTP, user.fullName)
        .then(() => console.log("OTP sent successfully"))
        .catch((err) => console.log(err));
    return res.status(CONSTANTS_1.OK).json((0, apiResponseUtil_1.apiResponse)(CONSTANTS_1.OK, "OTP sent successfully", null));
}));
exports.sendOTPcontroller = sendOTPcontroller;
// * verify user through otp
const verifyUserController = (0, asynhandlerUtil_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { otp: userOTP } = req.body;
    if (!userOTP.trim())
        throw {
            status: CONSTANTS_1.BAD_REQUEST,
            message: "Please enter OTP",
        };
    const user = yield db_1.prisma.user.findUnique({
        where: {
            otp: userOTP.toString(),
        },
    });
    if (!user)
        throw {
            status: CONSTANTS_1.BAD_REQUEST,
            message: "User Doesn't exist",
        };
    if (((_a = user.otp) === null || _a === void 0 ? void 0 : _a.trim()) !== userOTP.trim()) {
        throw {
            status: CONSTANTS_1.BAD_REQUEST,
            message: "Invalid OTP",
        };
    }
    // check if otp is expired
    if (user.otpExpiry && user.otpExpiry < new Date()) {
        throw {
            status: CONSTANTS_1.BAD_REQUEST,
            message: "OTP is expired",
        };
    }
    const verifiedUser = yield db_1.prisma.user.update({
        where: {
            otp: userOTP.toString(),
        },
        data: {
            isVerfied: true,
            otp: null,
            otpExpiry: null,
            otpRequestCount: 0,
            cooldownExpiry: null,
        },
        select: {
            uid: true,
            email: true,
            username: true,
            role: true,
            isVerfied: true,
            tokenVersion: true,
            fullName: true,
        },
    });
    const payload = {
        uid: verifiedUser && verifiedUser.uid,
        email: verifiedUser && verifiedUser.email,
        username: verifiedUser && verifiedUser.username,
        fullName: verifiedUser && verifiedUser.fullName,
        role: verifiedUser && verifiedUser.role,
        tokenVersion: verifiedUser && (verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.tokenVersion),
        isVerfied: verifiedUser && verifiedUser.isVerfied,
    };
    const verifiedAccessToken = (0, tokenGenerator_1.GenerateJWTAccessToken)(payload, res);
    return res
        .status(CONSTANTS_1.OK)
        .cookie("accessToken", verifiedAccessToken, CONSTANTS_1.COOKIES_OPTION)
        .json((0, apiResponseUtil_1.apiResponse)(CONSTANTS_1.OK, "OTP verified successfully", verifiedUser));
}));
exports.verifyUserController = verifyUserController;
// * Login User Controller
const loginUserController = (0, asynhandlerUtil_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*
     * ####Algo for login#######3
     * check if user is registered
     * hash the password
     * check if credentials are valid
     * make user login
     * generate token
     * save it into user's cookies
     */
    const { email, password, username } = req.body;
    if (!username && !email)
        throw { status: 400, message: "username or email is required" };
    if (!password)
        throw { status: 400, message: "password is required" };
    const isUserRegistered = yield db_1.prisma.user.findFirst({
        where: {
            OR: [{ username }, { email }],
        },
    });
    if (!isUserRegistered)
        throw {
            status: CONSTANTS_1.NOT_FOUND,
            message: "user doesn't exist",
        };
    const isPasswordValid = yield (0, passwordHasher_1.verifyPassword)(password, isUserRegistered.password, res);
    if (!isPasswordValid)
        throw { status: CONSTANTS_1.UNAUTHORIZED, message: "Invalid credentials" };
    const payload = {
        uid: isUserRegistered && isUserRegistered.uid,
        email: isUserRegistered && isUserRegistered.email,
        username: isUserRegistered && isUserRegistered.username,
        fullName: isUserRegistered && isUserRegistered.fullName,
        role: isUserRegistered && isUserRegistered.role,
        tokenVersion: isUserRegistered && (isUserRegistered === null || isUserRegistered === void 0 ? void 0 : isUserRegistered.tokenVersion),
        isVerfied: isUserRegistered && isUserRegistered.isVerfied,
    };
    const accessToken = (0, tokenGenerator_1.GenerateJWTAccessToken)(payload, res);
    return res
        .status(CONSTANTS_1.OK)
        .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        sameSite: "none",
        domain: ".zlaam.vercel.app",
        path: "/home",
    }
    // COOKIES_OPTION
    )
        .json((0, apiResponseUtil_1.apiResponse)(CONSTANTS_1.OK, `${isUserRegistered.fullName || "Unknown User"} logged in successfully`, { user: payload, accessToken }));
}));
exports.loginUserController = loginUserController;
// * Fetch all user controller
const getAllUsersController = (0, asynhandlerUtil_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10 } = req.query;
    const pageNumber = Number(page);
    const pageLimit = Number(limit);
    if (isNaN(pageNumber) ||
        isNaN(pageLimit) ||
        pageNumber <= 0 ||
        pageLimit <= 0) {
        throw { status: 400, message: "Invalid pagination parameters!!" };
    }
    const skip = (pageNumber - 1) * pageLimit;
    const take = pageLimit;
    const users = yield db_1.prisma.user.findMany({
        select: {
            uid: true,
            username: true,
            fullName: true,
            email: true,
            role: true,
            isVerfied: true,
            createdAt: true,
            updatedAt: true,
            blogPosts: {
                select: {
                    blogId: true,
                    blogTitle: true,
                    createdAt: true,
                    updatedAt: true,
                },
            },
        },
        skip,
        take,
        orderBy: {
            createdAt: "asc",
        },
    });
    const totalUsers = yield db_1.prisma.user.count();
    const totalPages = Math.ceil(totalUsers / pageLimit);
    const hasNextPage = totalPages > pageNumber;
    const hasPreviousPage = pageNumber > 1;
    const pagination = {
        hasNextPage,
        hasPreviousPage,
    };
    return res.status(CONSTANTS_1.OK).json((0, apiResponseUtil_1.apiResponse)(CONSTANTS_1.OK, "All users fetched successfully", { users }, {
        totalUsers,
        totalPages,
        pagination,
    }));
}));
exports.getAllUsersController = getAllUsersController;
// * Fetch single user controller
const getSingleUserController = (0, asynhandlerUtil_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.params;
    if (!uid)
        throw { status: 400, message: "user id is required!!" };
    const singleUser = yield db_1.prisma.user.findUnique({
        where: { uid },
        select: {
            uid: true,
            username: true,
            fullName: true,
            email: true,
            role: true,
            isVerfied: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return res
        .status(CONSTANTS_1.OK)
        .json((0, apiResponseUtil_1.apiResponse)(CONSTANTS_1.OK, `${singleUser === null || singleUser === void 0 ? void 0 : singleUser.username}'s data fetched successfully!!`, singleUser));
}));
exports.getSingleUserController = getSingleUserController;
// * Update user controller
const updateUserController = (0, asynhandlerUtil_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.params;
    const { username, fullName, email } = req.body;
    if (!username || !fullName || !email)
        throw { status: 400, message: "All fields are required!!" };
    const isUserAlreadyExist = yield db_1.prisma.user.findFirst({
        where: {
            AND: [
                {
                    OR: [{ email: email }, { username: username }],
                },
                {
                    NOT: { uid },
                },
            ],
        },
    });
    if (isUserAlreadyExist)
        throw {
            status: 400,
            message: "username or email already exists",
        };
    const updatedUser = yield db_1.prisma.user.update({
        where: { uid },
        data: {
            username,
            fullName,
            email,
        },
        select: { username: true, fullName: true, email: true, updatedAt: true },
    });
    return res
        .status(201)
        .json((0, apiResponseUtil_1.apiResponse)(201, "Profile updated successfully!!", updatedUser));
}));
exports.updateUserController = updateUserController;
// * Update user Role Controller
const updateUserRoleController = (0, asynhandlerUtil_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.params;
    const { role } = req.body;
    if (!role)
        throw { status: CONSTANTS_1.NOT_FOUND, message: "Role not found" };
    if (role !== "ADMIN" && role !== "MODERATOR" && role !== "USER")
        throw {
            status: CONSTANTS_1.BAD_REQUEST,
            message: `You can  only set 'ADMIN', 'MODERATOR' and 'USER' as a role.`,
        };
    const updateUserRole = yield db_1.prisma.user.update({
        where: { uid },
        data: { role, tokenVersion: { increment: 1 } },
    });
    const payload = {
        uid: updateUserRole && updateUserRole.uid,
        email: updateUserRole && updateUserRole.email,
        username: updateUserRole && updateUserRole.username,
        fullName: updateUserRole && updateUserRole.fullName,
        role: updateUserRole && updateUserRole.role,
        tokenVersion: updateUserRole && (updateUserRole === null || updateUserRole === void 0 ? void 0 : updateUserRole.tokenVersion),
    };
    const newAccessToken = (0, tokenGenerator_1.GenerateJWTAccessToken)(payload, res);
    return res
        .status(CONSTANTS_1.OK)
        .cookie("accessToken", newAccessToken, CONSTANTS_1.COOKIES_OPTION)
        .json((0, apiResponseUtil_1.apiResponse)(CONSTANTS_1.OK, `${updateUserRole.username || "user"}'s role updated successfully`, { user: updateUserRole }));
}));
exports.updateUserRoleController = updateUserRoleController;
// * Update user password controller
const updateUserPasswordController = (0, asynhandlerUtil_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.params;
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword)
        throw { status: CONSTANTS_1.NOT_FOUND, message: "All fields are required!!" };
    const user = yield db_1.prisma.user.findUnique({ where: { uid } });
    const isOldPasswordValid = yield (0, passwordHasher_1.verifyPassword)(oldPassword, user === null || user === void 0 ? void 0 : user.password, res);
    if (!isOldPasswordValid)
        throw { status: CONSTANTS_1.BAD_REQUEST, message: "Invalid Old password!!" };
    if (oldPassword === newPassword)
        throw {
            status: CONSTANTS_1.FORBIDDEN,
            message: "New Password can't be same as Old Password!!",
        };
    const hashedPassword = yield (0, passwordHasher_1.passwordHasher)(newPassword, res);
    const updateUserPassword = yield db_1.prisma.user.update({
        where: { uid },
        data: { password: hashedPassword },
        select: {
            username: true,
            fullName: true,
            updatedAt: true,
            createdAt: true,
        },
    });
    return res
        .status(CONSTANTS_1.OK)
        .json((0, apiResponseUtil_1.apiResponse)(CONSTANTS_1.OK, `${updateUserPassword.username || "user"}'s password updated successfully`, { user: updateUserPassword }));
}));
exports.updateUserPasswordController = updateUserPasswordController;
// * Delete user controller
const deleteUserController = (0, asynhandlerUtil_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.params;
    const user = yield db_1.prisma.user.findUnique({ where: { uid } });
    if (!user)
        throw { status: CONSTANTS_1.NOT_FOUND, message: "User not found!!" };
    yield db_1.prisma.user.delete({ where: { uid } });
    return res
        .status(CONSTANTS_1.OK)
        .json((0, apiResponseUtil_1.apiResponse)(CONSTANTS_1.OK, `${user.username || "unknown user"} deleted successfully`, { user: user.email }));
}));
exports.deleteUserController = deleteUserController;
// * Logout user Controller
const logoutUserController = (0, asynhandlerUtil_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("logout successfully");
    return res
        .status(CONSTANTS_1.OK)
        .clearCookie("accessToken", CONSTANTS_1.COOKIES_OPTION)
        .json((0, apiResponseUtil_1.apiResponse)(CONSTANTS_1.OK, `user logout successfully!!`));
}));
exports.logoutUserController = logoutUserController;
// * Search user profile controller
const searchUserController = (0, asynhandlerUtil_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { q, page = 1, limit = 10 } = req.query;
    // if (!q) throw { status: 400, message: "Search query is required!!" };
    const searchQuery = q;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    if (isNaN(pageNumber) ||
        isNaN(limitNumber) ||
        pageNumber <= 0 ||
        limitNumber <= 0) {
        throw { status: 400, message: "Invalid pagination parameters!!" };
    }
    const skip = (pageNumber - 1) * limitNumber;
    const take = limitNumber;
    const users = (yield db_1.prisma.$queryRaw `
      SELECT * FROM "User"
      WHERE to_tsvector('english', "username" || ' ' || "email" || ' ' || "fullName") @@ plainto_tsquery('english', ${searchQuery})
      ORDER BY "createdAt" DESC
      OFFSET ${skip} LIMIT ${take}
    `);
    const totalUsersCount = yield db_1.prisma.$queryRaw `
      SELECT COUNT(*) FROM "User"
      WHERE to_tsvector('english', "username" || ' ' || "email" || ' ' || "fullName") @@ plainto_tsquery('english', ${searchQuery})
    `;
    const UsersCount = Number(totalUsersCount[0].count);
    const totalPages = Math.ceil(UsersCount / take);
    const hasNextPage = totalPages > pageNumber;
    const hasPreviousPage = pageNumber > 1;
    const pagination = {
        hasNextPage,
        hasPreviousPage,
    };
    const response = {
        success: true,
        statusCode: 200,
        message: "Data searched successfully!!",
        data: {
            users,
        },
        metaData: {
            totalUsers: UsersCount,
            totalPages,
            currentPage: pageNumber,
            pagination,
        },
        optMessage: "",
    };
    return res.status(CONSTANTS_1.OK).json(response);
}));
exports.searchUserController = searchUserController;
// * Get Current User Controller
const getCurrentUserController = (0, asynhandlerUtil_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = req.userFromToken;
    return res
        .status(CONSTANTS_1.OK)
        .json((0, apiResponseUtil_1.apiResponse)(CONSTANTS_1.OK, `You are ${currentUser === null || currentUser === void 0 ? void 0 : currentUser.fullName}`, currentUser));
}));
exports.getCurrentUserController = getCurrentUserController;
