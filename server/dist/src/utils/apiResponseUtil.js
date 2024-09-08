"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiResponse = void 0;
const apiResponse = (status, message = "OK", data = null, metaData = null, optMessage = "") => {
    return {
        success: status < 400,
        statusCode: status,
        message: message,
        data: data,
        metaData: metaData,
        optMessage: optMessage,
    };
};
exports.apiResponse = apiResponse;
