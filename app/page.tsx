import Products from "@/components/products/products"
import Category from "@/components/section/category"
import ProductSlider from "@/components/section/product-slider"
import { db } from "@/server"
import { products, productVariants, variantTags } from "@/server/schema"
import { eq } from "drizzle-orm"
export default async function Home() {
  const data = await db.query.productVariants.findMany({

    with: {
      variantTags: true,
      variantImages: true,
      product: true,
    },
    orderBy: (productVariants, { desc }) => [desc(productVariants.id)],
  })
  return (
    <div className="">
      <ProductSlider />
      <Category />
      <Products variants={data} />
    </div>
  )
}
