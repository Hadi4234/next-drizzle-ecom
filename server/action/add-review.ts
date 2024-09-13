"use server"

import { reviewSchema } from "@/types/review-schema"
import { createSafeActionClient } from "next-safe-action"
import { auth } from "../auth"
import { db } from ".."
import { and, eq } from "drizzle-orm"
import { reviews } from "../schema"
import { revalidatePath } from "next/cache"

const action = createSafeActionClient()

export const addReview = action(reviewSchema,
  async ({ productID, rating, comment }) => {
    try {
      const session = await auth();
      if (!session) return { error: "Unauthorized" }
      const reviewExists = await db.query.reviews.findFirst({
        where: and(
          eq(reviews.productID, productID),
          eq(reviews.userId, session?.user.id)
        )
      })

      if (reviewExists) return { error: "You have already reviewed this product" }

      const newReview = await db.insert(reviews).values({
        productID,
        rating,
        comment,
        userId: session?.user.id
      }).returning()
      revalidatePath(`/products/${productID}`)
      return { success: newReview[0] }
    } catch (error) {
      return { error: "Failed to add review" }
    }
  }
)