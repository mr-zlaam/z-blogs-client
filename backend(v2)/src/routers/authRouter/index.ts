import { Router } from "express";
import { validateData } from "../../middlewares/validationMiddleware";
import { userRegistrationSchema, userUpdateSchema } from "../../schemas";
import {
  getAllUsersController,
  getSingleUserController,
  updateUserController,
  updateUserRoleController,
  userLoginController,
  userRegisterController,
} from "../../controllers/authController/authController";
const authRouter = Router();
authRouter
  .route("/register")
  .post(validateData(userRegistrationSchema), userRegisterController);
authRouter.route("/login").post(userLoginController);
authRouter.route("/getAllUsers").get(getAllUsersController);
authRouter.route("/getSingleUser/:uid").get(getSingleUserController);
authRouter
  .route("/updateUser/:uid")
  .put(validateData(userUpdateSchema), updateUserController);
authRouter.route("/updateRole/:uid").put(updateUserRoleController);
export { authRouter };
