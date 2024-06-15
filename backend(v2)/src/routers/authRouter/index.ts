import { Router } from "express";
import { validateData } from "../../middlewares/validationMiddleware";
import { userLoginSchema, userRegistrationSchema } from "../../schemas";
import {
  userLoginController,
  userRegisterController,
} from "../../controllers/authController/authController";
const authRouter = Router();
authRouter
  .route("/register")
  .post(validateData(userRegistrationSchema), userRegisterController);
authRouter
  .route("/login")
  .post(validateData(userLoginSchema), userLoginController);
export { authRouter };
