import { RegisterSchema } from "@/types/register-schema";
import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { users } from "../schema";
import { eq } from "drizzle-orm";
import { generateEmailVerificationToken } from "./tokens";
import { sendVerificationEmail } from "./email";
import bcrypt from 'bcryptjs';


const action = createSafeActionClient();

export const emailRegister= action(RegisterSchema, async ({ name, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  console.log(hashedPassword)
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email)
  })
  if (existingUser) {
    if (!existingUser.emailVerified) {
      const verificationToken = await generateEmailVerificationToken(email)
      await sendVerificationEmail(verificationToken[0].email,verificationToken[0].token)
      return { success: "Email Confirmation sent" }
    }

    return { error: "Email already in use" }
  }

  await db.insert(users).values({
    name,
    email,
    password: hashedPassword, 
  })
  const verificationToken = await generateEmailVerificationToken(email)
  await sendVerificationEmail(verificationToken[0].email,verificationToken[0].token)
  return { success: "Email Confirmation sent" }
   
  
})
