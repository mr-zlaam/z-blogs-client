import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asynhandlerUtil";
import { passwordHasher } from "../../utils/passwordHasher";
import { prisma } from "../../db";
import { BAD_REQUEST, OK } from "../../CONSTANTS";
import { apiResponse } from "../../utils/apiResponseUtil";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "../../config";
import {
  GenerateJWTAccessToken,
  PayLoadType,
} from "../../utils/tokenGenerator";

// * Register the User
const userRegisterController = asyncHandler(
  async (req: Request, res: Response) => {
    /*
     ********Algo for Registration********
     * Check if the user already exists
     * Hash the password
     * Create a new user
     * Return the user data
     */
    const { username, fullName, email, password } = req.body;
    const isUserExist = await prisma.user.findFirst({
      where: { username, email },
    });
    if (isUserExist)
      throw { status: BAD_REQUEST, message: "user already exists!!" };
    const isAdmin = ADMIN_EMAIL === email && ADMIN_PASSWORD === password;
    const hashedPassword = (await passwordHasher(password, res)) as string;
    const newUser = await prisma.user.create({
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
      },
    });
    const payload: PayLoadType = {
      uid: newUser && newUser.uid,
      email: newUser && newUser.email,
      username: newUser && newUser.username,
      fullName: newUser && newUser.fullName,
      role: newUser && newUser.role,
    };
    const accessToken = GenerateJWTAccessToken(payload, res);
    return res
      .status(OK)
      .json(
        apiResponse(
          OK,
          `${newUser.username || "User"} registered successfully!!`,
          { newUser, accessToken }
        )
      );
  }
);
export { userRegisterController };
