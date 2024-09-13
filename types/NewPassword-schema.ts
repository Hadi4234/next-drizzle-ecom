import * as z from "zod"

export const NewPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
})