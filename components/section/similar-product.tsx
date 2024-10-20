import { db } from '@/server'
import { categories, products, productVariants } from '@/server/schema'
import { eq } from 'drizzle-orm'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Separator } from '../ui/separator'
import { Badge } from '../ui/badge'
import formatPrice from '@/lib/format-price'

async function SimilarProduct({ categoryID }: { categoryID: number }) {
  const product = await db.query.products.findMany({
    where: eq(products.categoryID, categoryID),
    with: {
      productVariants: {
        with: {
          variantImages: true,
          variantTags: true
        }
      }
    }
  })

  console.log(product.map((p) => p.productVariants))

  return (
    <main className="flex flex-col gap-5 my-10">
      <h1 className="text-xl font-medium">Similar Products</h1>
      <Separator />
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-12 lg:grid-cols-3 ">
        {
          product.map((variants) => (variants.productVariants.map((variant) => (
            <Link
              className="p-3 border rounded-md shadow-md hover:shadow-xl"
              key={variant.id}
              href={`/products/${variant.id}?id=${variant.id}&productID=${variant.productID}&price=${variants.price}&title=${variants.title}&type=${variant.productType}&image=${variant?.variantImages[0]?.url}`}

            >
              <Image
                className="rounded-md pb-2"
                src={variant?.variantImages[0]?.url}
                width={720}
                height={480}
                alt={variants.title}
                loading="lazy"
              />
              <div className="flex justify-between p-3">
                <div className="font-medium">
                  <h2>{variants.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    {variant.productType}
                  </p>
                </div>
                <div>
                  <Badge className="text-sm" variant={"secondary"}>
                    {formatPrice(variants.price)}
                  </Badge>
                </div>
              </div>
            </Link>
          ))))
        }
      </div>

    </main>
  )
}

export default SimilarProduct