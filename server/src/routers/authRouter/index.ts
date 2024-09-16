import { Router } from "express";
import {
  deleteUserController,
  getAllUsersController,
  getCurrentUserController,
  getSingleUserController,
  loginUserController,
  logoutUserController,
  registerUserController,
  searchUserController,
  sendOTPcontroller,
  updateUserController,
  updateUserPasswordController,
  updateUserRoleController,
  verifyUserController,
} from "../../controllers/authController/authController";
import {
  CheckToken,
  ifUserIsAdmin,
  logoutMiddleware,
} from "../../middlewares/authMiddleware";
import { validateData } from "../../middlewares/validationMiddleware";
import {
  passwrodValidator,
  userRegistrationSchema,
  userUpdateSchema,
} from "../../schemas";
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
authRouter
  .route("/getSingleUser/:uid")
  .get(CheckToken, getSingleUserController);
// * get current login user
authRouter.route("/currentUser").get(CheckToken, getCurrentUserController);
// *  update current user
authRouter
  .route("/updateUser/:uid")
  .put(validateData(userUpdateSchema), CheckToken, updateUserController);
// * update role of current user
authRouter
  .route("/updateRole/:uid")
  .put(CheckToken, ifUserIsAdmin, updateUserRoleController);
// * update password of current user
authRouter
  .route("/updatePassword/:uid")
  .put(
    validateData(passwrodValidator),
    CheckToken,
    updateUserPasswordController
  );
// * delete user
authRouter
  .route("/deleteUser/:uid")
  .delete(CheckToken, ifUserIsAdmin, deleteUserController);
//* Logout user
authRouter.route("/logoutUser").get(logoutMiddleware, logoutUserController);
// *  full text search router
authRouter
  .route("/getAllUsers/search")
  .get(CheckToken, ifUserIsAdmin, searchUserController);

export { authRouter };
