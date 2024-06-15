import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asynhandlerUtil";
import { passwordHasher } from "../../utils/passwordHasher";
import { prisma } from "../../db";
import { BAD_REQUEST, OK } from "../../CONSTANTS";
import { apiResponse } from "../../utils/apiResponseUtil";

// * Register the User
const userRegisterController = asyncHandler(
  async (req: Request, res: Response) => {
    const { username, fullName, email, password } = req.body;
    // * Check if the user already exists
    // * Hash the password
    // * Create a new user
    // * Return the user data
    const isUserExist = await prisma.user.findFirst({
      where: { username, email },
    });
    if (isUserExist)
      throw { status: BAD_REQUEST, message: "user already exists!!" };
    const hashedPassword = (await passwordHasher(password, res)) as string;
    const newUser = await prisma.user.create({
      data: {
        username,
        fullName,
        email,
        password: hashedPassword,
      },
      select: { username: true, fullName: true, email: true },
    });
    return res
      .status(OK)
      .json(
        apiResponse(
          OK,
          `${newUser.username || "User"} registered successfully!!`,
          newUser
        )
      );
  }
);
export { userRegisterController };
