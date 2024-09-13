
import { NewPasswordSchema } from "@/types/NewPassword-schema";
import { createSafeActionClient } from "next-safe-action";
import { getPasswordResetTokenByToken } from "./tokens";
import bcrypt from 'bcryptjs';
import { db } from "..";
import { passwordResetTokens, users } from "../schema";
import { eq } from "drizzle-orm";

const action = createSafeActionClient();

export const newPasseword = action(NewPasswordSchema, async ({ password, token }) => {
  if (!token) {
    return{error:"Missing token"}
  }
  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return { error: "Token not found" }
  }
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token has expired" }
  }
  
  const existingUser = await db.query.users.findFirst({
      where: eq(users.email, existingToken.email),
    })

    if (!existingUser) {
      return { error: "User not found" }
    }


  const hashedPassword = await bcrypt.hash(password, 10);
  await db.transaction(async (tx) => {
    await tx.update(users).set({ password: hashedPassword }).where(eq(users.id, existingUser.id));
    await tx.delete(passwordResetTokens).where(eq(passwordResetTokens.id, existingToken.id));
 }) 
  return { success: "Password reset successfully" };
})

