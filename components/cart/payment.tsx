"use client"
import getStripe from "@/lib/get-stripe"
import { useCartStore } from "@/lib/client-store"
import { Elements } from "@stripe/react-stripe-js"
import { useTheme } from "next-themes"
import CheckoutForm from "./payment-form";
import { motion } from "framer-motion"
import PaymentForm from "./payment-form"


const stripe = getStripe()

export default function Payment() {
  const { cart } = useCartStore()
  const { theme } = useTheme()

  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.price * item.variant.quantity
  }, 0)
  return (

    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Elements
        stripe={stripe}
        options={{
          mode: "payment",
          currency: "usd",
          amount: totalPrice * 100,
          appearance: {
            theme: theme === "dark" ? "night" : "stripe",
          },
        }}
      >
        <PaymentForm totalPrice={totalPrice} />
      </Elements>
    </motion.div>

  )
}

