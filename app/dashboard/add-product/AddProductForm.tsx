"use client"

import { useForm } from "react-hook-form"
import { zProductSchema, ProductSchema } from "@/types/product-schema"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { DollarSign } from "lucide-react"
import Tiptap from "./tiptap"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAction } from "next-safe-action/hooks"
import { createProduct } from "@/server/action/create-product"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { getProduct } from "@/server/action/get-product"
import { useEffect } from "react"

export default function ProductForm() {

  const form = useForm<zProductSchema>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: "",
      categoryID: 0,
      description: "",
      price: 0,
    },
    mode: "onChange",
  })

  const router = useRouter();
  const searchParams = useSearchParams()
  const editMode = searchParams.get("id")

  const checkProduct = async (id: number) => {
    if (editMode) {
      const data = await getProduct(id)
      if (data.error) {
        toast.error(data.error)
        router.push("/dashboard/products")
        return
      }
      if (data.success) {
        const id = parseInt(editMode)
        form.setValue("title", data.success.title)
        form.setValue("description", data.success.description)
        form.setValue("price", data.success.price)
        form.setValue("categoryID", data.success.categoryID)
        form.setValue("id", id)
      }

    }
  }

  useEffect(() => {
    if (editMode) {
      checkProduct(parseInt(editMode))
    }
  }, [editMode])

  const { execute, status } = useAction(createProduct, {
    onSuccess: (data) => {
      if (data?.success) {
        router.push("/dashboard/products")
        toast.success(data.success)
      }
      if (data?.error) {
        toast.error(data.error)
      }
    },
    onExecute: (data) => {
      if (editMode) {
        toast.loading("Editing Product")
      }
      if (!editMode) {
        toast.loading("Creating Product")
      }
    },
  })

  async function onSubmit(values: zProductSchema) {
    execute(values)
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>{editMode ? "Edit Prodcut" : "Create Product"}</CardTitle>
        <CardDescription>{editMode ? "Make changes to existing product" : "Add a brand new product"}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="py-2">
                  <FormLabel>Product Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Saekdong Stripe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryID"
              render={({ field }) => (
                <FormItem className="py-2">
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">living room</SelectItem>
                      <SelectItem value="2">dining</SelectItem>
                      <SelectItem value="3">lighting</SelectItem>
                      <SelectItem value="4">bed room</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Tiptap val={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Price</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <DollarSign
                        size={36}
                        className="p-2 bg-muted  rounded-md"
                      />
                      <Input
                        {...field}
                        type="number"
                        placeholder="Your price in USD"
                        step="0.1"
                        min={0}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full"
              disabled={
                status === "executing" ||
                !form.formState.isValid ||
                !form.formState.isDirty
              }
              type="submit"
            >
              {editMode ? "Save Changes" : "Create Product"}            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

