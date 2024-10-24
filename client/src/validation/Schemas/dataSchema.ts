import type {
  UserLoginTypes,
  UserRegisterTypes,
  UserUpdateTypes,
} from "@/types";
import { enum as enum_, object, string, type ZodType } from "zod";

export const registerSchema: ZodType<UserRegisterTypes> = object({
  username: string().min(1, { message: "username is required" })
    .min(3, { message: "username must contain at least  3 characters" })
    .max(20, { message: "username must not contain more than 20 characters" })
    .regex(new RegExp(/^[a-z0-9_.]{1,20}$/), {
      message: "Only underscore_, numbers and lowercase letters are allowed.",
    })
    .toLowerCase(),
  fullName: string().min(1, { message: "full Name is required" })
    .min(3, { message: "full Name must contain at least  3 characters" })
    .max(50, { message: "full Name is too long" })
    .regex(new RegExp(/^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/), {
      message: "full name is invalid",
    }),
  email: string().min(1, { message: "email is required" })
    .min(4, { message: "email must contain atleast 4 characters" })
    .max(200, { message: "email is too long" })
    .email({ message: "email is not valid" })
    .toLowerCase(),
  password: string().min(1, { message: "password is required" })
    .min(6, { message: "password must contain at least 6 characters" })
    .regex(
      new RegExp(
        /^(?!.*\s)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~`-])[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?/~`-]{6,}$/,
      ),
      { message: "Password is not strong (e.g: p@ssword)" },
    )
    .max(50, { message: "Password is too long" }),
  confirmPassword: string().min(1, { message: "confirm password  is required" })
    .min(6, { message: "confirm password must contain at least 6 characters" })
    .max(50, { message: "Password is too long" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "confirm password is not same as passwords",
  path: ["confirmPassword"],
});

export const loginSchema: ZodType<UserLoginTypes> = object({
  usernameORmail: string({ message: "username or email is required" })
    .trim()
    .max(100, {
      message: "This field must not contain more than 100 characters",
    })
    .min(1, { message: "username or email is required" }),

  password: string().min(1, { message: "password is required" }),
});

export const updateSchema: ZodType<UserUpdateTypes> = object({
  username: string()
    .min(3, { message: "This field requires at least  3 characters" })
    .max(50, { message: "username is too long" })
    .regex(new RegExp(/^[a-z0-9]+(_[a-z0-9]+)?(-[a-z0-9]+)?$/), {
      message: "Username is invalid.",
    })
    .toLowerCase(),
  fullName: string()
    .min(3, { message: "This field requires at least  3 characters" })
    .max(50, { message: "Full Name is too long" })
    .regex(new RegExp(/^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/), {
      message: "Full name is invalid",
    }),
  email: string()
    .email()
    .min(5, { message: "This field requires at least 5 characters" })
    .max(100, { message: "Email is too long" })
    .toLowerCase(),
});
interface UserUpdateRoleType {
  role: "ADMIN" | "MODERATOR" | "USER";
}
export const updateRoleSchema: ZodType<UserUpdateRoleType> = object({
  role: enum_(["ADMIN", "MODERATOR", "USER"], {
    errorMap: () => ({ message: "Role must be ADMIN | MODERATOR | USER" }),
  }),
});

export const blogSchema: ZodType = object({
  title: string().min(2, {
    message: "title must contain atleast 4 characters",
  }),
  slug: string(),
  description: string().min(100, {
    message: "description must contain atleast 100 characters.",
  }),
});
//verify otp
export const FormSchema = object({
  pin: string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});
