"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFoundHandler = void 0;
const config_1 = require("../config");
const client_1 = require("@prisma/client");
const notFoundHandler = (req, res, next) => {
    const error = new Error("This Api doesn't exist right now!!");
    error.status = 404;
    next(error);
};
exports.notFoundHandler = notFoundHandler;
const errorHandler = (error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        success: false,
        statusCode: error.status || 500,
        message: error instanceof client_1.Prisma.PrismaClientKnownRequestError
            ? "something went wrong while working with prisma!!"
            : error.message + "!!" || "internal server error!!",
        data: null,
        stack: config_1.ISDEVELOPMENT_ENVIRONMENT && error.stack ? error.stack : null,
        stacks: config_1.ISDEVELOPMENT_ENVIRONMENT
            ? error.stack
                ? error.stack
                : "No stack has been sent"
            : "", // for debugging
    });
};
exports.errorHandler = errorHandler;
