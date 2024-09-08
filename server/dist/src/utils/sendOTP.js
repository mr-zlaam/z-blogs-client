"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOTP = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../config");
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const slug_and_str_generator_1 = require("./slug_and_str_generator");
// Create a transporter object using the default SMTP transport
let transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: config_1.SERVER_MAIL,
        pass: config_1.SERVER_MAIL_PASS, // Use the app password if 2FA is enabled
    },
});
// Send OTP function
function sendOTP(to, otp, name) {
    return __awaiter(this, void 0, void 0, function* () {
        const templatePath = node_path_1.default.resolve(__dirname, "../templ/otp.html");
        let htmlTemplate = node_fs_1.default.readFileSync(templatePath, "utf8");
        htmlTemplate = htmlTemplate.replace("{{otp}}", otp).replace("{{name}}", name);
        const randomStr = (0, slug_and_str_generator_1.generateRandomStrings)(10);
        let mailOptions = {
            from: "noreply@github.com",
            to: to,
            subject: "OTP Verification",
            html: htmlTemplate,
            headers: {
                "Message-ID": `<${randomStr}.dev>`,
            },
        };
        try {
            let info = yield transporter.sendMail(mailOptions);
            console.log("OTP sent: " + info.response);
        }
        catch (error) {
            if (error instanceof Error)
                console.error("Error sending OTP:", error.message);
            else
                console.error("Error sending OTP:", error);
        }
    });
}
exports.sendOTP = sendOTP;
