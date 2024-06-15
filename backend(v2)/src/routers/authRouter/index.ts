import { Router } from "express";
import { validateData } from "../../middlewares/validationMiddleware";
import { userRegistrationSchema } from "../../schemas";
import { userRegisterController } from "../../controllers/authController/authController";
const authRouter = Router();
authRouter
  .route("/register")
  .post(validateData(userRegistrationSchema), userRegisterController);
export { authRouter };
