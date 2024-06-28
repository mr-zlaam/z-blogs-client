import type {
  BlogTypes,
  UserLoginTypes,
  UserRegisterTypes,
  UserUpdateTypes,
} from "@/types";
import { type ZodType, object, string, enum as enum_ } from "zod";

export const registerSchema: ZodType<UserRegisterTypes> = object({
  username: string()
    .min(3, { message: "This field requires at least  3 characters" })
    .max(20, { message: "Username must not contain more than 10 characters" })
    .regex(new RegExp(/^[a-z0-9_.]{1,20}$/), {
      message: "Username is invalid.",
    })
    .toLowerCase(),
  fullName: string()
    .min(3, { message: "This field requires at least  3 characters" })
    .max(20, { message: "Full Name is too long" })
    .regex(new RegExp(/^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/), {
      message: "Full name is invalid",
    }),
  email: string()
    .email()
    .min(5, { message: "This field requires at least 5 characters" })
    .max(100, { message: "Email is too long" })

    .toLowerCase(),
  password: string()
    .min(6, { message: "This field requires at least 6 characters" })
    .max(50, { message: "Password is too long" })
    .regex(
      new RegExp(
        /^(?!.*\s)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~`-])[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?/~`-]{6,}$/
      ),
      { message: "Password is invalid" }
    ),
  confirmPassword: string()
    .min(6, { message: "This field requires at least 6 characters" })
    .max(50, { message: "Password is too long" })
    .regex(
      new RegExp(
        /^(?!.*\s)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~`-])[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?/~`-]{6,}$/
      ),
      { message: "Confirmpassword is invalid" }
    ),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Confirmpassword is not same as passwords",
  path: ["confirmPassword"],
});

export const loginSchema: ZodType<UserLoginTypes> = object({
  email: string()
    .email()
    .min(5, { message: "This field requires at least 5 characters" })
    .max(100, { message: "Email is too long" })
    .regex(new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/), {
      message: "Please provide valid email",
    })
    .toLowerCase(),
  password: string().min(1, { message: "This field is required" }),
});

export const updateSchema: ZodType<UserUpdateTypes> = object({
  username: string()
    .min(3, { message: "This field requires at least  3 characters" })
    .max(10, { message: "Username must not contain more than 10 characters" })
    .regex(new RegExp(/^[a-z0-9]+(_[a-z0-9]+)?(-[a-z0-9]+)?$/), {
      message: "Username is invalid.",
    })
    .toLowerCase(),
  fullName: string()
    .min(3, { message: "This field requires at least  3 characters" })
    .max(20, { message: "Full Name is too long" })
    .regex(new RegExp(/^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/), {
      message: "Full name is invalid",
    }),
  email: string()
    .email()
    .min(5, { message: "This field requires at least 5 characters" })
    .max(30, { message: "Email is too long" })
    .toLowerCase(),
  role: enum_(["admin", "user", "sub-admin"], {
    errorMap: () => ({ message: "Role must be user|sub-admin|admin" }),
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
