import { Router } from "express";
import { validateData } from "../../middlewares/validationMiddleware";
import {
  passwrodValidator,
  userRegistrationSchema,
  userUpdateSchema,
} from "../../schemas";
import {
  deleteUserController,
  getAllUsersController,
  getSingleUserController,
  updateUserController,
  updateUserPasswordController,
  updateUserRoleController,
  registerUserController,
  loginUserController,
  logoutUserController,
  searchUserController,
  getCurrentUserController,
  verifyUserController,
  sendOTPcontroller,
} from "../../controllers/authController/authController";
import {
  CheckToken,
  ifUser,
  ifUserIsAdmin,
} from "../../middlewares/authMiddleware";
const authRouter = Router();
// * Register user
authRouter
  .route("/register")
  .post(validateData(userRegistrationSchema), registerUserController);
// * login userr
authRouter.route("/login").post(loginUserController);
// * send email
authRouter.route("/sendOTP").post(CheckToken, sendOTPcontroller);

// * verify user
authRouter.route("/verifyUser").post(CheckToken, verifyUserController);
// * get all users
authRouter
  .route("/getAllUsers")
  .get(CheckToken, ifUserIsAdmin, getAllUsersController);
// * get single user
authRouter.route("/getSingleUser/:uid").get(ifUser, getSingleUserController);
// * get current login user
authRouter.route("/currentUser").get(ifUser, getCurrentUserController);
// *  update current user
authRouter
  .route("/updateUser/:uid")
  .put(validateData(userUpdateSchema), ifUser, updateUserController);
// * update role of current user
authRouter
  .route("/updateRole/:uid")
  .put(CheckToken, ifUserIsAdmin, updateUserRoleController);
// * update password of current user
authRouter
  .route("/updatePassword/:uid")
  .put(validateData(passwrodValidator), ifUser, updateUserPasswordController);
// * delete user
authRouter
  .route("/deleteUser/:uid")
  .delete(CheckToken, ifUserIsAdmin, deleteUserController);
authRouter.route("/logoutUser/:uid").get(logoutUserController);
// *  full text search router
authRouter
  .route("/getAllUsers/search")
  .get(CheckToken, ifUserIsAdmin, searchUserController);

export { authRouter };
