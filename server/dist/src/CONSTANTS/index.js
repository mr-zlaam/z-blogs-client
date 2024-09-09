"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COOKIES_OPTION = exports.UNAUTHORIZED = exports.SERVICE_UNAVAILABLE = exports.OK = exports.NOT_IMPLEMENTED = exports.NOT_FOUND = exports.INTERNAL_SERVER_ERROR = exports.GATEWAY_TIMEOUT = exports.FORBIDDEN = exports.CREATED = exports.BAD_REQUEST = void 0;
const http_status_codes_1 = require("http-status-codes");
const statusCode = {
    OK: http_status_codes_1.StatusCodes.OK,
    CREATED: http_status_codes_1.StatusCodes.CREATED,
    BAD_REQUEST: http_status_codes_1.StatusCodes.BAD_REQUEST,
    UNAUTHORIZED: http_status_codes_1.StatusCodes.UNAUTHORIZED,
    FORBIDDEN: http_status_codes_1.StatusCodes.FORBIDDEN,
    NOT_FOUND: http_status_codes_1.StatusCodes.NOT_FOUND,
    INTERNAL_SERVER_ERROR: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
    NOT_IMPLEMENTED: http_status_codes_1.StatusCodes.NOT_IMPLEMENTED,
    SERVICE_UNAVAILABLE: http_status_codes_1.StatusCodes.SERVICE_UNAVAILABLE,
    GATEWAY_TIMEOUT: http_status_codes_1.StatusCodes.GATEWAY_TIMEOUT,
    COOKIES_OPTION: {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        sameSite: "none",
        domain: ".zlaam.vercel.app",
    },
};
//codes
exports.BAD_REQUEST = statusCode.BAD_REQUEST, exports.CREATED = statusCode.CREATED, exports.FORBIDDEN = statusCode.FORBIDDEN, exports.GATEWAY_TIMEOUT = statusCode.GATEWAY_TIMEOUT, exports.INTERNAL_SERVER_ERROR = statusCode.INTERNAL_SERVER_ERROR, exports.NOT_FOUND = statusCode.NOT_FOUND, exports.NOT_IMPLEMENTED = statusCode.NOT_IMPLEMENTED, exports.OK = statusCode.OK, exports.SERVICE_UNAVAILABLE = statusCode.SERVICE_UNAVAILABLE, exports.UNAUTHORIZED = statusCode.UNAUTHORIZED, 
//options
exports.COOKIES_OPTION = statusCode.COOKIES_OPTION;
