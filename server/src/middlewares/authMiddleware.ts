import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config";
import { BAD_REQUEST, UNAUTHORIZED } from "../CONSTANTS";
import { PayLoadType, UserData } from "../types";
import { asyncHandler } from "../utils/asynhandlerUtil";
import { prisma } from "../db";
export interface RequestUser extends Request {
  userFromToken?: PayLoadType;
  userFromDB?: UserData;
}
// Check if user have token
export const CheckToken = asyncHandler(
  async (req: RequestUser, res: Response, next: NextFunction) => {
    const token = req.header("Authorization");
    if (!token)
      throw { status: BAD_REQUEST, message: "unable to find any token" };

    // check if user is there
    const parsedToken = token?.split(" ")[1] || "";

    let decodedToken;
    try {
      decodedToken = verify(parsedToken, JWT_SECRET_KEY) as PayLoadType;
      // console.log("token is valid md check", decodedToken);
    } catch (error: any) {
      throw { status: 400, message: "invalid token" };
    }
    // console.log("Value extracted from decoded Token", decodedToken);
    const user = (await prisma.user.findUnique({
      where: { uid: decodedToken?.uid },
    })) as UserData;
    if (!user)
      throw { status: 400, message: "user not found (middleware check check)" };
    if (decodedToken.tokenVersion !== user?.tokenVersion)
      throw {
        status: 400,
        message:
          "Your login session expired. Please login again (middleware check check)",
      };
    req.userFromToken = decodedToken;
    req.userFromDB = user && user;
    next();
  }
);
export const ifUserIsAdmin = asyncHandler(
  async (req: RequestUser, res: Response, next: NextFunction) => {
    console.log(req?.userFromToken);

    if (req.userFromToken?.role !== "ADMIN") {
      throw {
        status: UNAUTHORIZED,
        message:
          "Only admin can modify this data (check from admin middleware)",
      };
    }
    if (!req.userFromDB?.isVerfied) {
      throw {
        status: UNAUTHORIZED,
        message: "Admin is not verified",
      };
    }
    next();
  }
);
// For moderator who can only write the data
export const ifUserIsModerator_OR_Admin = asyncHandler(
  async (req: RequestUser, res: Response, next: NextFunction) => {
    if (
      req.userFromToken?.role !== "ADMIN" &&
      req.userFromToken?.role !== "MODERATOR"
    )
      throw {
        status: UNAUTHORIZED,
        message: "Only Admin or moderator can modify this data",
      };
    if (!req.userFromDB?.isVerfied) {
      throw {
        status: UNAUTHORIZED,
        message: " Moderator  is not verified",
      };
    }
    next();
  }
);
// If user is not login
export const ifUser = asyncHandler(
  async (req: RequestUser, res: Response, next: NextFunction) => {
    if (req.userFromToken?.role !== "USER")
      throw { status: UNAUTHORIZED, message: "you are not logged in" };

    next();
  }
);

export const logoutMiddleware = asyncHandler(
  async (req: RequestUser, res: Response, next: NextFunction) => {
    const token = req.header("Authorization");
    if (!token) {
      throw {
        status: UNAUTHORIZED,
        message: "User is not login",
      };
    }
    let decodedToken;
    const parsedToken = token?.split(" ")[1] || "";

    try {
      decodedToken = verify(parsedToken, JWT_SECRET_KEY) as PayLoadType;
    } catch (error: any) {
      console.log("Token is not valid");
    }
    if (decodedToken?.uid) {
      const user = await prisma.user.findUnique({
        where: { uid: decodedToken.uid },
      });
      if (user) return next();
      else {
        throw {
          status: UNAUTHORIZED,
          message: "User is not real",
        };
      }
    }
    next();
  }
);
