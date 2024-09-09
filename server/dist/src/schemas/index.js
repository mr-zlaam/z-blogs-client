"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogUpdateValidation = exports.BlogValidation = exports.passwrodValidator = exports.userUpdateSchema = exports.userRegistrationSchema = void 0;
const zod_1 = require("zod");
exports.userRegistrationSchema = zod_1.z.object({
    username: zod_1.z
        .string({ message: "username is required!!" })
        .min(3, {
        message: "Username must be at least 3 characters long. e.g: user123",
    })
        .regex(/^[a-z0-9_.]{1,20}$/, {
        message: "Username can only contain lowercase letters, numbers, underscores, and periods. e.g: user123",
    }),
    fullName: zod_1.z
        .string({ message: "fullName is required!!" })
        .min(3, {
        message: "Full name must be at least 3 characters long. e.g: John Doe",
    })
        .regex(/^[a-zA-Z ]{3,20}$/, {
        message: "Full name can only contain letters and spaces. e.g: John Doe",
    }),
    email: zod_1.z
        .string({ message: "email is required!!" })
        .regex(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, {
        message: "Invalid email format. e.g: john.doe@example.com",
    }),
    password: zod_1.z
        .string({ message: "password is required!!" })
        .min(6, { message: "password must be at least 6 characters long." })
        .regex(/^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~`-])[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?/~`-]/, {
        message: "Password must contain at least one special character. e.g: P@ssw0rd!",
    }),
});
//update schema
exports.userUpdateSchema = zod_1.z.object({
    username: zod_1.z
        .string({ message: "username is required!!" })
        .min(3, {
        message: "Username must be at least 3 characters long. e.g: user123",
    })
        .regex(/^[a-z0-9_.]{1,50}$/, {
        message: "Username can only contain lowercase letters, numbers, underscores, and periods. e.g: user123",
    }),
    fullName: zod_1.z
        .string({ message: "fullName is required!!" })
        .min(3, {
        message: "Full name must be at least 3 characters long. e.g: John Doe",
    })
        .regex(/^[a-zA-Z ]{3,50}$/, {
        message: "Full name can only contain letters and spaces. e.g: John Doe",
    }),
    email: zod_1.z
        .string({ message: "email is required!!" })
        .regex(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, {
        message: "Invalid email format. e.g: john.doe@example.com",
    }),
});
exports.passwrodValidator = zod_1.z.object({
    oldPassword: zod_1.z.string({ message: "old password is required!!" }),
    newPassword: zod_1.z
        .string({ message: "new password is required!!" })
        .min(6, { message: "password must be at least 6 characters long." })
        .regex(/^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~`-])[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?/~`-]/, {
        message: "Password must contain at least one special character. e.g: P@ssw0rd!",
    }),
});
// * Blog Validation
exports.BlogValidation = zod_1.z.object({
    authorId: zod_1.z.string({ message: "author id is required!!" }),
    blogTitle: zod_1.z.string({ message: "blog title is required!!" }),
    blogDescription: zod_1.z.string({ message: "blog content is required!!" }),
    blogThumbnail: zod_1.z
        .string({ message: "blog thumbnail is required!!" })
        .regex(new RegExp(/^(?:(?:https?|ftp):\/\/)?(?:\([^)]+\)|[^:\s]+)(?:\:\S+)?(?:\/[\w-._~:\/?#[\]@!$&'()*+,;=%]*)$/), { message: "blog thumbnail's url is invalid!!" }),
    blogThumbnailAuthor: zod_1.z.string({
        message: "blog thumbnail author is required!!",
    }),
});
exports.BlogUpdateValidation = zod_1.z.object({
    blogTitle: zod_1.z.string({ message: "blog title is required!!" }),
    blogDescription: zod_1.z.string({ message: "blog content is required!!" }),
    blogThumbnail: zod_1.z
        .string({ message: "blog thumbnail is required!!" })
        .regex(new RegExp(/^(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]*[-A-Za-z0-9+&@#/%=~_|]$/), { message: "blog thumbnail's url is invalid!!" }),
    blogThumbnailAuthor: zod_1.z.string({
        message: "blog thumbnail author is required!!",
    }),
    isPublic: zod_1.z.boolean({ message: "Is Pubic field is required!!" }),
});
