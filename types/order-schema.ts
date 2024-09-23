import * as z from 'zod';

export const createOrderSchema = z.object({
  total: z.number(),
  status: z.string(),
  paymentIntentID: z.string(),
  products: z.array(
    z.object({
      quantity: z.number(),
      productID: z.number(),
      variantID: z.number(),
    })
  ),
});
