import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config";
import { BAD_REQUEST, FORBIDDEN } from "../CONSTANTS";
import { PayLoadType, UserData } from "../types";
import { asyncHandler } from "../utils/asynhandlerUtil";
import { prisma } from "../db";
export interface RequestUser extends Request {
  userFromToken?: PayLoadType;
  userFromDB?: UserData;
}
// Check if user have token
export const checkIfUserHaveToken = asyncHandler(
  async (req: RequestUser, res: Response, next: NextFunction) => {
    const token = req.header("Authorization");
    if (!token)
      throw { status: BAD_REQUEST, message: "unable to find any token" };

    // check if user is there
    const parsedToken = token?.split(" ")[1] || "";

    let decodedToken;
    try {
      decodedToken = verify(parsedToken, JWT_SECRET_KEY) as PayLoadType;
    } catch (error: any) {
      throw { status: 400, message: error.message || "invalid token!!" };
    }
    console.log("Value extracted from decoded Token", decodedToken);
    const user = await prisma.user.findUnique({
      where: { uid: decodedToken?.uid },
    });
    if (!user)
      throw { status: 400, message: "user not found (middleware check check)" };
    req.userFromToken;
  }
);
export const ifUserIsAdmin = asyncHandler(
  async (req: RequestUser, res: Response, next: NextFunction) => {
    const token = req.header("Authorization");
    if (!token)
      throw { status: BAD_REQUEST, message: "unable to find any token" };
    const parsedToken = token?.split(" ")[1] || "";
    let decodedToken;
    try {
      decodedToken = verify(parsedToken, JWT_SECRET_KEY) as PayLoadType;
    } catch (error: any) {
      throw { status: 400, message: error.message || "invalid token!!" };
    }
    if (decodedToken.role !== "ADMIN")
      throw { status: FORBIDDEN, message: "Only Admin can modify this data" };
    req.userFromToken = decodedToken;
    next();
  }
);
// For moderator who can only write the data
export const ifUserIsModerator_OR_Admin = asyncHandler(
  async (req: RequestUser, res: Response, next: NextFunction) => {
    const token = req.header("Authorization");
    if (!token)
      throw { status: BAD_REQUEST, message: "unable to find any token" };
    const parsedToken = token?.split(" ")[1] || "";
    let decodedToken;
    try {
      decodedToken = verify(parsedToken, JWT_SECRET_KEY) as PayLoadType;
    } catch (error: any) {
      // console.log(error.message);
      throw { status: 400, message: error.message || "invalid token!!" };
    }
    if (decodedToken.role !== "ADMIN" && decodedToken.role !== "MODERATOR")
      throw {
        status: FORBIDDEN,
        message: "Only Admin or moderator can modify this data",
      };
    req.userFromToken = decodedToken;

    next();
  }
);
// If user is not login
export const ifUser = asyncHandler(
  async (req: RequestUser, res: Response, next: NextFunction) => {
    const token = req.header("Authorization");
    if (!token)
      throw { status: BAD_REQUEST, message: "unable to find any token" };
    const parsedToken = token?.split(" ")[1] || "";
    let decodedToken;
    try {
      decodedToken = verify(parsedToken, JWT_SECRET_KEY) as PayLoadType;
    } catch (error: any) {
      console.log(error.message);
      throw { status: 400, message: error.message || "invalid token!!" };
    }
    req.userFromToken = decodedToken;
    next();
  }
);
