import { auth } from "@/server/auth"
import CreateEditProduct from "./AddProductForm"

export default async function AddProduct() {
  const session = await auth()
  if (session?.user.role !== "admin") {
    return (
      <div>
        <h1>Unauthorized</h1>
      </div>
    )

  }
  return (
    <CreateEditProduct />
  )
}

