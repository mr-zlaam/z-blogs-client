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
} from "../../controllers/authController/authController";
import {
  CheckToken,
  ifUser,
  ifUserIsAdmin,
} from "../../middlewares/authMiddleware";
const authRouter = Router();
authRouter
  .route("/register")
  .post(validateData(userRegistrationSchema), registerUserController);
authRouter.route("/login").post(loginUserController);
authRouter
  .route("/getAllUsers")
  .get(CheckToken, ifUserIsAdmin, getAllUsersController);
authRouter.route("/getSingleUser/:uid").get(ifUser, getSingleUserController);
authRouter.route("/currentUser").get(ifUser, getCurrentUserController);
authRouter
  .route("/updateUser/:uid")
  .put(validateData(userUpdateSchema), ifUser, updateUserController);
authRouter
  .route("/updateRole/:uid")
  .put(CheckToken, ifUserIsAdmin, updateUserRoleController);
authRouter
  .route("/updatePassword/:uid")
  .put(validateData(passwrodValidator), ifUser, updateUserPasswordController);
authRouter
  .route("/deleteUser/:uid")
  .delete(CheckToken, ifUserIsAdmin, deleteUserController);
authRouter.route("/logoutUser/:uid").get(logoutUserController);
// full text search router
authRouter
  .route("/getAllUsers/search")
  .get(CheckToken, ifUserIsAdmin, searchUserController);

export { authRouter };
