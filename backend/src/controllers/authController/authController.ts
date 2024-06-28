import type { Request, Response } from "express";
import {
  BAD_REQUEST,
  COOKIES_OPTION,
  FORBIDDEN,
  NOT_FOUND,
  OK,
  UNAUTHORIZED,
} from "../../CONSTANTS";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "../../config";
import { prisma } from "../../db";
import { apiResponse } from "../../utils/apiResponseUtil";
import { asyncHandler } from "../../utils/asynhandlerUtil";
import { passwordHasher, verifyPassword } from "../../utils/passwordHasher";
import { GenerateJWTAccessToken } from "../../utils/tokenGenerator";
import { PayLoadType, SearchQueryType, UserData } from "../../types";
import { RequestUser } from "../../middlewares/authMiddleware";

// * Register  User Controller
const registerUserController = asyncHandler(
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
      throw { status: BAD_REQUEST, message: "user already exists" };
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

// * Login User Controller
const loginUserController = asyncHandler(
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
          OK,
          `${isUserRegistered.fullName || "Unknown User"} logged in successfully`,
          { user: payload, accessToken }
        )
      );
  }
);
// * Fetch all user controller
const getAllUsersController = asyncHandler(
  async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const pageNumber = Number(page);
    const pageLimit = Number(limit);

    if (
      isNaN(pageNumber) ||
      isNaN(pageLimit) ||
      pageNumber <= 0 ||
      pageLimit <= 0
    ) {
      throw { status: 400, message: "Invalid pagination parameters!!" };
    }

    const skip = (pageNumber - 1) * pageLimit;
    const take = pageLimit;
    const users = await prisma.user.findMany({
      select: {
        uid: true,
        username: true,
        fullName: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        blogPosts: {
          select: {
            blogId: true,
            blogTitle: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
      skip,
      take,
      orderBy: {
        createdAt: "desc",
      },
    });
    const totalUsers = await prisma.user.count();
    const totalPages = Math.ceil(totalUsers / pageLimit);

    const hasNextPage = totalPages > pageNumber;
    const hasPreviousPage = pageNumber > 1;
    const pagination = {
      hasNextPage,
      hasPreviousPage,
    };
    return res.status(OK).json(
      apiResponse(
        OK,
        "All users fetched successfully",
        { users },
        {
          totalUsers,
          totalPages,
          pagination,
        }
      )
    );
  }
);
// * Fetch single user controller
const getSingleUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const { uid } = req.params;
    if (!uid) throw { status: 400, message: "user id is required!!" };
    const singleUser = await prisma.user.findUnique({
      where: { uid },
      select: {
        uid: true,
        username: true,
        fullName: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return res
      .status(OK)
      .json(
        apiResponse(
          OK,
          `${singleUser?.username}'s data fetched successfully!!`,
          singleUser
        )
      );
  }
);
// * Update user controller
const updateUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const { uid } = req.params;
    const { username, fullName, email } = req.body;
    if (!username || !fullName || !email)
      throw { status: 400, message: "All fields are required!!" };

    const isUserAlreadyExist = await prisma.user.findFirst({
      where: {
        AND: [
          {
            OR: [{ email: email }, { username: username }],
          },
          {
            NOT: { uid },
          },
        ],
      },
    });
    if (isUserAlreadyExist)
      throw {
        status: 400,
        message: "username or email already exists",
      };

    const updatedUser = await prisma.user.update({
      where: { uid },
      data: {
        username,
        fullName,
        email,
      },
      select: { username: true, fullName: true, email: true, updatedAt: true },
    });
    return res
      .status(201)
      .json(apiResponse(201, "Profile updated successfully!!", updatedUser));
  }
);
// * Update user Role Controller
const updateUserRoleController = asyncHandler(
  async (req: Request, res: Response) => {
    const { uid } = req.params;
    const { role } = req.body;
    if (!role) throw { status: NOT_FOUND as number, message: "Role not found" };
    if (role !== "ADMIN" && role !== "MODERATOR" && role !== "USER")
      throw {
        status: BAD_REQUEST,
        message: `You can  only set 'ADMIN', 'MODERATOR' and 'USER' as a role.`,
      };
    const updateUserRole = await prisma.user.update({
      where: { uid },
      data: { role },
    });
    return res
      .status(OK)
      .json(
        apiResponse(
          OK,
          `${updateUserRole.username || "user"}'s role updated successfully`,
          { user: updateUserRole }
        )
      );
  }
);
// * Update user password controller
const updateUserPasswordController = asyncHandler(
  async (req: Request, res: Response) => {
    const { uid } = req.params;
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword)
      throw { status: NOT_FOUND, message: "All fields are required!!" };
    const user = await prisma.user.findUnique({ where: { uid } });
    const isOldPasswordValid = await verifyPassword(
      oldPassword,
      user?.password as string,
      res
    );
    if (!isOldPasswordValid)
      throw { status: BAD_REQUEST, message: "Invalid Old password!!" };
    if (oldPassword === newPassword)
      throw {
        status: FORBIDDEN,
        message: "New Password can't be same as Old Password!!",
      };
    const hashedPassword = await passwordHasher(newPassword, res);
    const updateUserPassword = await prisma.user.update({
      where: { uid },
      data: { password: hashedPassword as string },
      select: {
        username: true,
        fullName: true,
        updatedAt: true,
        createdAt: true,
      },
    });
    return res
      .status(OK)
      .json(
        apiResponse(
          OK,
          `${updateUserPassword.username || "user"}'s password updated successfully`,
          { user: updateUserPassword }
        )
      );
  }
);
// * Delete user controller
const deleteUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const { uid } = req.params;
    const user = await prisma.user.findUnique({ where: { uid } });
    if (!user) throw { status: NOT_FOUND, message: "User not found!!" };
    await prisma.user.delete({ where: { uid } });
    return res
      .status(OK)
      .json(
        apiResponse(
          OK,
          `${user.username || "unknown user"} deleted successfully`,
          { user: user.email }
        )
      );
  }
);
// * Logout user Controller
const logoutUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const { uid } = req.params;
    const user = await prisma.user.findUnique({ where: { uid } });
    return res
      .status(OK)
      .clearCookie("accessToken", COOKIES_OPTION)
      .json(
        apiResponse(OK, `${user?.username || "user"} logout successfully!!`)
      );
  }
);
// * Search user profile controller
const searchUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const { q, page = 1, limit = 10 } = req.query;

    if (!q) throw { status: 400, message: "Search query is required!!" };

    const searchQuery = q as string;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    if (
      isNaN(pageNumber) ||
      isNaN(limitNumber) ||
      pageNumber <= 0 ||
      limitNumber <= 0
    ) {
      throw { status: 400, message: "Invalid pagination parameters!!" };
    }

    const skip = (pageNumber - 1) * limitNumber;
    const take = limitNumber;

    const users = (await prisma.$queryRaw`
      SELECT * FROM "User"
      WHERE to_tsvector('english', "username" || ' ' || "email" || ' ' || "fullName") @@ plainto_tsquery('english', ${searchQuery})
      ORDER BY "createdAt" DESC
      OFFSET ${skip} LIMIT ${take}
    `) as UserData[];

    const totalUsersCount: { count: string }[] = await prisma.$queryRaw`
      SELECT COUNT(*) FROM "User"
      WHERE to_tsvector('english', "username" || ' ' || "email" || ' ' || "fullName") @@ plainto_tsquery('english', ${searchQuery})
    `;

    const UsersCount = Number(totalUsersCount[0].count);
    const totalPages = Math.ceil(UsersCount / take);
    const hasNextPage = totalPages > pageNumber;
    const hasPreviousPage = pageNumber > 1;
    const pagination = {
      hasNextPage,
      hasPreviousPage,
    };

    const response: SearchQueryType = {
      success: true,
      statusCode: 200,
      message: "Data searched successfully!!",
      data: {
        users,
      },
      metaData: {
        totalUsers: UsersCount,
        totalPages,
        currentPage: pageNumber,
        pagination,
      },
      optMessage: "",
    };

    return res.status(OK).json(response);
  }
);
// * Get Current User Controller
export const getCurrentUserController = asyncHandler(
  async (req: RequestUser, res: Response) => {
    const currentUser = req.user;
    return res
      .status(OK)
      .json(apiResponse(OK, `You are ${currentUser?.fullName}`, currentUser));
  }
);
export {
  deleteUserController,
  getAllUsersController,
  getSingleUserController,
  loginUserController,
  logoutUserController,
  registerUserController,
  updateUserController,
  updateUserPasswordController,
  updateUserRoleController,
  searchUserController,
};
