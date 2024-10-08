"use client"

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"

export default function Socials() {
  return (
    <div className="flex flex-col items-center w-full gap-4 ">
      {/* <Button
        onClick={() =>
          signIn("google", {
            redirect: false,
            callbackUrl: "/",
          })
        }
      >
        Sign in with Google
      </Button> */}
      <Button variant={"secondary"}
        className="flex gap-4 w-full"
        onClick={() =>
          signIn("github", {
            redirect: false,
            callbackUrl: "/",
          })
        }
      >
        <p>Sign in with Github</p>
        <FcGoogle className="w-5 h-5" />     </Button>
    </div>
  )
}