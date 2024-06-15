import { z } from "zod";

export const userRegistrationSchema = z.object({
  username: z
    .string({ message: "username is required!!" })
    .min(3, {
      message: "Username must be at least 3 characters long. e.g: user123",
    })
    .regex(/^[a-z0-9_.]{1,20}$/, {
      message:
        "Username can only contain lowercase letters, numbers, underscores, and periods. e.g: user123",
    }),
  fullName: z
    .string({ message: "fullName is required!!" })
    .min(3, {
      message: "Full name must be at least 3 characters long. e.g: John Doe",
    })
    .regex(/^[a-zA-Z ]{3,20}$/, {
      message: "Full name can only contain letters and spaces. e.g: John Doe",
    }),
  email: z
    .string({ message: "email is required!!" })
    .regex(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, {
      message: "Invalid email format. e.g: john.doe@example.com",
    }),
  password: z
    .string({ message: "password is required!!" })
    .min(6, { message: "password must be at least 6 characters long." })
    .regex(
      /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~`-])[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?/~`-]/,
      {
        message:
          "Password must contain at least one special character. e.g: P@ssw0rd!",
      }
    ),
});

//Login schema
const baseSchema = z.object({
  email: z.string().optional(),
  username: z.string().optional(),
  password: z.string(),
});

export const userLoginSchema = baseSchema.refine(
  (data) => data.email || data.username,
  {
    message: "Either username or email must be provided",
    path: ["email", "username"],
  }
);
