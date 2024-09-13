import { auth } from "@/server/auth"
import CreateEditProduct from "./AddProductForm"

export default async function AddProduct() {
  const session = await auth()
  if(session?.user.role!=="admin"){
    throw new Error("Unauthorized")

  }
  return (
  <CreateEditProduct/>
  )
}

