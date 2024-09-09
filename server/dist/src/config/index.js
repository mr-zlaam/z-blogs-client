"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVER_MAIL_PASS = exports.SERVER_MAIL = exports.JWT_SECRET_KEY = exports.ADMIN_PASSWORD = exports.ADMIN_EMAIL = exports.ISDEVELOPMENT_ENVIRONMENT = exports.PORT = exports.DB_URI = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const _config = {
    DB_URI: process.env.DATABASE_URL,
    PORT: process.env.PORT,
    ISDEVELOPMENT_ENVIRONMENT: true,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    JWT_SECRET_KEY: process.env.JWT_SECRET,
    SERVER_MAIL_PASS: process.env.SERVER_MAIL_PASS,
    SERVER_MAIL: process.env.SERVER_MAIL,
};
exports.DB_URI = _config.DB_URI, exports.PORT = _config.PORT, exports.ISDEVELOPMENT_ENVIRONMENT = _config.ISDEVELOPMENT_ENVIRONMENT, exports.ADMIN_EMAIL = _config.ADMIN_EMAIL, exports.ADMIN_PASSWORD = _config.ADMIN_PASSWORD, exports.JWT_SECRET_KEY = _config.JWT_SECRET_KEY, exports.SERVER_MAIL = _config.SERVER_MAIL, exports.SERVER_MAIL_PASS = _config.SERVER_MAIL_PASS;
