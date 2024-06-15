import bcrypt from "bcrypt";
import { Response } from "express";
import { apiResponse } from "./apiResponseUtil";

export const passwordHasher = async (password: string, res: Response) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error: any) {
    console.log(error.message);
    return res
      .status(500)
      .json(
        apiResponse(
          500,
          error.message || "internal server error while hashing the password"
        )
      );
  }
};
export const verifyPassword = async (
  password: string,
  existingPassword: string,
  res: Response
) => {
  try {
    const isPasswordValid = await bcrypt.compare(password, existingPassword);
    if (!isPasswordValid) throw { status: 403, message: "Invalid Credentials" };
    return isPasswordValid;
  } catch (error: any) {
    return res
      .status(500)
      .json(
        apiResponse(
          500,
          error.message || "Internal server Error while checking credentials",
          null
        )
      );
  }
};
