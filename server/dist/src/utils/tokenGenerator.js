"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateJWTAccessToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
const GenerateJWTAccessToken = (payload, res) => {
    try {
        let accessToken = (0, jsonwebtoken_1.sign)(payload, config_1.JWT_SECRET_KEY, {
            expiresIn: "7d",
        });
        return accessToken;
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: error.message || "Internal Server Error while generating tokens",
        });
    }
};
exports.GenerateJWTAccessToken = GenerateJWTAccessToken;
