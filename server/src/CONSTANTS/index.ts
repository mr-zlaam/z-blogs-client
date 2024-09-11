import { StatusCodes } from "http-status-codes";
type SameSiteType = "lax" | "none" | "strict";

const statusCode = {
  OK: StatusCodes.OK,
  CREATED: StatusCodes.CREATED,
  BAD_REQUEST: StatusCodes.BAD_REQUEST,
  UNAUTHORIZED: StatusCodes.UNAUTHORIZED,
  FORBIDDEN: StatusCodes.FORBIDDEN,
  NOT_FOUND: StatusCodes.NOT_FOUND,
  INTERNAL_SERVER_ERROR: StatusCodes.INTERNAL_SERVER_ERROR,
  NOT_IMPLEMENTED: StatusCodes.NOT_IMPLEMENTED,
  SERVICE_UNAVAILABLE: StatusCodes.SERVICE_UNAVAILABLE,
  GATEWAY_TIMEOUT: StatusCodes.GATEWAY_TIMEOUT,
  COOKIES_OPTION: {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    sameSite: "none" as SameSiteType,
    domain: "*.vercel.app",
  },
};
//codes
export const {
  BAD_REQUEST,
  CREATED,
  FORBIDDEN,
  GATEWAY_TIMEOUT,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  NOT_IMPLEMENTED,
  OK,
  SERVICE_UNAVAILABLE,
  UNAUTHORIZED,
  COOKIES_OPTION,
} = statusCode;
