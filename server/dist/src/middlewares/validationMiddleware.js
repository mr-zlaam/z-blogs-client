"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateData = void 0;
const zod_1 = require("zod");
const CONSTANTS_1 = require("../CONSTANTS");
function validateData(schema) {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errorMessages = error.errors.map((issue) => ({
                    message: `${issue.message}`,
                }));
                res.status(CONSTANTS_1.BAD_REQUEST).json({
                    success: false,
                    status: CONSTANTS_1.BAD_REQUEST,
                    error: "Invalid data",
                    details: errorMessages,
                });
            }
            else {
                res.status(CONSTANTS_1.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    status: CONSTANTS_1.INTERNAL_SERVER_ERROR,
                    error: "Internal Server Error",
                });
            }
        }
    };
}
exports.validateData = validateData;
