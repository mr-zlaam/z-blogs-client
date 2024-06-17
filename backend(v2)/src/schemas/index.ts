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

//update schema
export const userUpdateSchema = z.object({
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
});
export const passwrodValidator = z.object({
  oldPassword: z.string({ message: "old password is required!!" }),
  newPassword: z
    .string({ message: "new password is required!!" })
    .min(6, { message: "password must be at least 6 characters long." })
    .regex(
      /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~`-])[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?/~`-]/,
      {
        message:
          "Password must contain at least one special character. e.g: P@ssw0rd!",
      }
    ),
});
// * Blog Validation

export const BlogValidation = z.object({
  authorId: z.string({ message: "author id is required!!" }),
  blogTitle: z.string({ message: "blog title is required!!" }),
  blogDescription: z.string({ message: "blog content is required!!" }),
  blogSlug: z
    .string({ message: "blog slug is required!!" })
    .regex(new RegExp(/^[a-z0-9-]+$/), { message: "blog slug is not valid!!" }),
  blogThumbnail: z
    .string({ message: "blog thumbnail is required!!" })
    .regex(
      new RegExp(
        /^(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]*[-A-Za-z0-9+&@#/%=~_|]$/
      ),
      { message: "blog thumbnail's url is invalid!!" }
    ),
  blogThumbnailAuthor: z.string({
    message: "blog thumbnail author is required!!",
  }),
});

export const BlogUpdateValidation = z.object({
  blogTitle: z.string({ message: "blog title is required!!" }),
  blogDescription: z.string({ message: "blog content is required!!" }),
  blogSlug: z
    .string({ message: "blog slug is required!!" })
    .regex(new RegExp(/^[a-z0-9-]+$/), { message: "blog slug is not valid!!" }),
  blogThumbnail: z
    .string({ message: "blog thumbnail is required!!" })
    .regex(
      new RegExp(
        /^(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]*[-A-Za-z0-9+&@#/%=~_|]$/
      ),
      { message: "blog thumbnail's url is invalid!!" }
    ),
  blogThumbnailAuthor: z.string({
    message: "blog thumbnail author is required!!",
  }),
});
