import { z } from "zod";

export const userRegistrationSchema = z.object({
  username: z
    .string()
    .min(3)
    .regex(new RegExp(/^[a-z0-9_.]{1,20}$/), { message: "Invalid username!!" }),
  fullName: z
    .string()
    .min(3)
    .regex(new RegExp(/^[a-zA-Z ]{3,20}$/), { message: "Invalid fullName!!" }),
  email: z.string().email({ message: "Invalid email!!" }),
  password: z
    .string()
    .min(6)
    .regex(
      new RegExp(
        /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~`-])[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?/~`-]{6,}$/
      ),
      { message: "Invalid Password" }
    ),
});
