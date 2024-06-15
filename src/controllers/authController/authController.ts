import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asynhandlerUtil";

// * Register the User
const userRegisterController = asyncHandler(
  async (req: Request, res: Response) => {
    const { username, fullName, email, password } = req.body;
    // * Check if the user already exists
    // * Hash the password
    // * Create a new user
    // * Return the user data

    return res.send("hello world");
  }
);
export { userRegisterController };
