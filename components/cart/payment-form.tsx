"use client"
import { useState, useEffect } from "react"
import {
  PaymentElement,
  AddressElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js"
import { createPaymentIntent } from "@/server/action/create-payment-intent"
import { useCartStore } from "@/lib/client-store"
import { useAction } from "next-safe-action/hooks"
import { Button } from "../ui/button"
import getBaseURL from "@/lib/base-url"
import { Currency } from "lucide-react"
import { createOrder } from "@/server/action/create-order"
import { toast } from "sonner"
export default function PaymentForm({ totalPrice }: { totalPrice: number }) {
  const stripe = useStripe()
  const elements = useElements()
  const { cart, setCheckoutProgress, clearCart } = useCartStore()
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const baseUrl = getBaseURL()


  const { execute } = useAction(createOrder, {
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error)
      }
      if (data.success) {
        setIsLoading(false)
        toast.success(data.success)
        setCheckoutProgress("confirmation-page")
        clearCart()

      }
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    if (!stripe || !elements) {
      setIsLoading(false)
      return
    }
    //Trigger form validation
    const { error: submitError } = await elements.submit()
    if (submitError) {
      setErrorMessage(submitError.message!)
      setIsLoading(false)
      return
    }

    //Fetch the paymentIntent with the user
    const { data } = await createPaymentIntent({
      amount: totalPrice,
      currency: "usd",
      cart: cart.map((item) => ({
        image: item.image,
        price: item.price,
        quantity: item.variant.quantity,
        productID: item.id,
        title: item.name,
      })),
    })
    if (data?.error) {
      setErrorMessage(data.error)
      setIsLoading(false)
      return
    }
    if (data?.success) {
      //Handle success
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret: data.success.clientSecretID!,
        redirect: "if_required",
        confirmParams: {
          return_url: "http://localhost:3000/success",
          receipt_email: data.success.user as string,
        },
      })
      if (error) {
        setErrorMessage(error.message!)
        setIsLoading(false)
        return
      } else {
        //Handle success
        setIsLoading(false)
        execute({
          status: "pending",
          paymentIntentID: data.success.paymentIntentID,
          total: totalPrice,
          products: cart.map((item) => ({
            productID: item.id,
            variantID: item.variant.variantID,
            quantity: item.variant.quantity,
          })),
        })
      }
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <AddressElement options={{ mode: "shipping" }} />
      <Button
        className="my-4  w-full"
        disabled={!stripe || !elements || isLoading}
      >
        {isLoading ? "Processing..." : "Pay now"}
      </Button>

    </form>
  )
}