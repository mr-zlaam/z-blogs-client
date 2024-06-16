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
} from "../../controllers/authController/authController";
const authRouter = Router();
authRouter
  .route("/register")
  .post(validateData(userRegistrationSchema), registerUserController);
authRouter.route("/login").post(loginUserController);
authRouter.route("/getAllUsers").get(getAllUsersController);
authRouter.route("/getSingleUser/:uid").get(getSingleUserController);
authRouter
  .route("/updateUser/:uid")
  .put(validateData(userUpdateSchema), updateUserController);
authRouter.route("/updateRole/:uid").put(updateUserRoleController);
authRouter
  .route("/updatePassword/:uid")
  .put(validateData(passwrodValidator), updateUserPasswordController);
authRouter.route("/deleteUser/:uid").delete(deleteUserController);
export { authRouter };
