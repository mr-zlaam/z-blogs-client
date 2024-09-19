"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const authController_1 = require("../../controllers/authController/authController");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const validationMiddleware_1 = require("../../middlewares/validationMiddleware");
const schemas_1 = require("../../schemas");
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
// * Register user
authRouter
    .route("/register")
    .post((0, validationMiddleware_1.validateData)(schemas_1.userRegistrationSchema), authController_1.registerUserController);
// * login userr
authRouter.route("/login").post(authController_1.loginUserController);
// * send email
authRouter.route("/sendOTP").post(authMiddleware_1.CheckToken, authController_1.sendOTPcontroller);
// * verify user
authRouter.route("/verifyUser").post(authMiddleware_1.CheckToken, authController_1.verifyUserController);
// * get all users
authRouter
    .route("/getAllUsers")
    .get(authMiddleware_1.CheckToken, authMiddleware_1.ifUserIsAdmin, authController_1.getAllUsersController);
// * get single user
authRouter
    .route("/getSingleUser/:uid")
    .get(authMiddleware_1.CheckToken, authController_1.getSingleUserController);
// * get current login user
authRouter.route("/currentUser").get(authMiddleware_1.CheckToken, authController_1.getCurrentUserController);
// *  update current user
authRouter
    .route("/updateUser/:uid")
    .put((0, validationMiddleware_1.validateData)(schemas_1.userUpdateSchema), authMiddleware_1.CheckToken, authController_1.updateUserController);
// * update role of current user
authRouter
    .route("/updateRole/:uid")
    .put(authMiddleware_1.CheckToken, authMiddleware_1.ifUserIsAdmin, authController_1.updateUserRoleController);
// * update password of current user
authRouter
    .route("/updatePassword/:uid")
    .put((0, validationMiddleware_1.validateData)(schemas_1.passwrodValidator), authMiddleware_1.CheckToken, authController_1.updateUserPasswordController);
// * delete user
authRouter
    .route("/deleteUser/:uid")
    .delete(authMiddleware_1.CheckToken, authMiddleware_1.ifUserIsAdmin, authController_1.deleteUserController);
//* Logout user
authRouter.route("/logoutUser").get(authMiddleware_1.logoutMiddleware, authController_1.logoutUserController);
// *  full text search router
authRouter
    .route("/getAllUsers/search")
    .get(authMiddleware_1.CheckToken, authMiddleware_1.ifUserIsAdmin, authController_1.searchUserController);
