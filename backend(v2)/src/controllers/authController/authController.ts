import type { Request, Response } from "express";
import {
  BAD_REQUEST,
  COOKIES_OPTION,
  NOT_FOUND,
  OK,
  UNAUTHORIZED,
} from "../../CONSTANTS";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "../../config";
import { prisma } from "../../db";
import { apiResponse } from "../../utils/apiResponseUtil";
import { asyncHandler } from "../../utils/asynhandlerUtil";
import { passwordHasher, verifyPassword } from "../../utils/passwordHasher";
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
const userLoginController = asyncHandler(
  async (req: Request, res: Response) => {
    /*
     * ####Algo for login#######3
     * check if user is registered
     * hash the password
     * check if credentials are valid
     * make user login
     * generate token
     * save it into user's cookies
     */
    const { email, password, username } = req.body;
    if (!username && !email)
      throw { status: 400, message: "username or email is required" };
    if (!password) throw { status: 400, message: "password is required" };
    const isUserRegistered = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });
    if (!isUserRegistered)
      throw {
        status: NOT_FOUND,
        message: "user doesn't exist!!",
      };
    const isPasswordValid = await verifyPassword(
      password,
      isUserRegistered.password,
      res
    );
    if (!isPasswordValid)
      throw { status: UNAUTHORIZED, message: "Invalid credentials" };
    const payload: PayLoadType = {
      uid: isUserRegistered && isUserRegistered.uid,
      email: isUserRegistered && isUserRegistered.email,
      username: isUserRegistered && isUserRegistered.username,
      fullName: isUserRegistered && isUserRegistered.fullName,
      role: isUserRegistered && isUserRegistered.role,
    };
    const accessToken = GenerateJWTAccessToken(payload, res);
    return res
      .status(OK)
      .cookie("accessToken", accessToken, COOKIES_OPTION)
      .json(
        apiResponse(
          200,
          `${isUserRegistered.fullName || "Unknown User"} logged in successfully`,
          { accessToken }
        )
      );
  }
);
export { userRegisterController, userLoginController };
