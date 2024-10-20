"use client"

import { VariantsWithProduct } from "@/lib/infer-type"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "../ui/badge"
import formatPrice from "@/lib/format-price"
import { Separator } from "@/components/ui/separator"

type ProductTypes = {
  variants: VariantsWithProduct[]
}

export default function Products({ variants }: ProductTypes) {
  return (
    <main className="flex flex-col gap-5 my-10">
      <h1 className="text-xl font-medium">New Products</h1>
      <Separator />
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-12 lg:grid-cols-3 ">
        {variants.map((variant, index) => (
          <Link
            className="p-3 border rounded-md shadow-md hover:shadow-xl"
            key={variant.id}
            href={`/products/${variant.id}?id=${variant.id}&productID=${variant.productID}&price=${variant.product.price}&title=${variant.product.title}&type=${variant.productType}&image=${variant?.variantImages[0]?.url}`}
          >
            {/* D:\Template\ecommerce\themesflat.co\html\ecomus\images\collections */}
            <Image
              className="rounded-md pb-2 object-fill w-full h-auto"
              src={variant?.variantImages[0]?.url}
              width={320}
              height={380}
              alt={variant.product.title}
              loading="lazy"
            />
            <div className="flex justify-between p-3 items-end align-bottom">
              <div className="font-medium">
                <h2>{variant.product.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {variant.productType}
                </p>
              </div>
              <div>
                <Badge className="text-sm" variant={"secondary"}>
                  {formatPrice(variant.product.price)}
                </Badge>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </main>
  )
}