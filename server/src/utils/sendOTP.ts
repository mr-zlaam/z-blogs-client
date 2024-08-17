import nodemailer from "nodemailer";
import { SERVER_MAIL, SERVER_MAIL_PASS } from "../config";
import fs from "node:fs";
import path from "node:path";
import { generateRandomStrings } from "./slug_and_str_generator";

// Create a transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: SERVER_MAIL,
    pass: SERVER_MAIL_PASS, // Use the app password if 2FA is enabled
  },
});

// Send OTP function
export async function sendOTP(to: string, otp: string, name: string) {
  const templatePath = path.resolve(__dirname, "../templ/otp.html");
  let htmlTemplate = fs.readFileSync(templatePath, "utf8");
  htmlTemplate = htmlTemplate.replace("{{otp}}", otp).replace("{{name}}", name);
  const randomStr = generateRandomStrings(10);
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
    let info = await transporter.sendMail(mailOptions);
    console.log("OTP sent: " + info.response);
  } catch (error) {
    if (error instanceof Error)
      console.error("Error sending OTP:", error.message);
    else console.error("Error sending OTP:", error);
  }
}
