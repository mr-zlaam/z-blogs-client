import { sign } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config";
import { Response } from "express";
export const GenerateJWTAccessToken = (userId: string, res: Response) => {
  try {
    let accessToken = sign({ sub: userId }, JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    return accessToken;
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      message: error.message || "Internal Server Error while generating tokens",
    });
  }
};
