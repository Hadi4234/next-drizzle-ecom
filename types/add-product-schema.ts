import * as z from "zod";

export const AddProductSchema = z.object({
  id:z.number().optional(),
  title:z.string().min(5,{message:"Title must be at least 5 character long" }),
  description:z.string().min(40,{message:"Description must be 40 character long"}),
  price:z.coerce.number({invalid_type_error:"Must be a number"}).positive({message:"Must be a positive number"}),
  productVariants:z.array(
    z.object({
      tags:z.array(z.string()).optional(),
      updated:z.date().optional(),
      id:z.number().optional(),
      color:z.string().min(3,{message:"Color must be least 3 characters"}),
      variantImages:z.array(
        z.object({
          url:z.string().url({message:"Must be a valid url"}),
          key:z.string().optional(),
          name:z.string(),
          id:z.number().optional(),
          size:z.number(),
        })
      )
    })
  )
  .min(1,{message:"Must have at least one variant"}),
}) 
