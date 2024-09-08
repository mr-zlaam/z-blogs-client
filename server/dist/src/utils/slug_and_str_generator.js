"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOtp = exports.generateSlug = exports.generateRandomStrings = void 0;
const node_crypto_1 = __importDefault(require("node:crypto"));
function generateRandomStrings(length) {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomString = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }
    return randomString;
}
exports.generateRandomStrings = generateRandomStrings;
function generateSlug(slugString) {
    let slug = slugString.toLowerCase();
    slug = slug.replace(/[^a-z0-9\s-]/g, "");
    slug = slug.trim().replace(/\s+/g, "-");
    return slug;
}
exports.generateSlug = generateSlug;
// OTP generator
// 5 digit random otp generator
function generateOtp() {
    let otp = node_crypto_1.default.randomInt(100000, 1000000).toString();
    otp = otp.padStart(6, "0");
    const otpExpiry = new Date(Date.now() + 30 * 60 * 1000); // change expiry time using the first letter after Date.now()+1
    return { otp, otpExpiry };
}
exports.generateOtp = generateOtp;
