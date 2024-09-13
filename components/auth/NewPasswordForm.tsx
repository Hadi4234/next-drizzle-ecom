"use client"

import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { AuthCard } from "./AuthCard"
import {zodResolver} from '@hookform/resolvers/zod'
import * as z from "zod";
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Link from "next/link"
import { emailSignIn } from "@/server/action/emailSignIn"
import {useAction } from 'next-safe-action/hooks'
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { FormSuccess } from "./FormSuccess"
import { FormError } from "./FormError"
import { NewPasswordSchema } from "@/types/NewPassword-schema"
export const NewPasswordForm = () => {
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    }

  })
  const router = useRouter()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const { execute, status } = useAction(emailSignIn, {
    onSuccess: (data) => {
     if (data?.error) setError(data.error)
      if (data?.success) {
        setSuccess(data.success)
      }
    }

  }) 
  const onSubmit = (value: z.infer<typeof NewPasswordSchema>) => {
    execute(value)
  }
  return (
    <AuthCard
      cardTitle="Welcome back!"
      backButtonHref="/auth/register"
      backButtonLabel="Create a new account"
      showSocials
    >
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
           
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="*********" autoComplete="current-password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
              )}
            />
             <FormSuccess message={success} />
              <FormError message={error} />
            <Button size={'sm'} variant={'link'} asChild>
              <Link href={'/auth/reset'} >Forgot your password
              </Link>
            
            </Button>
            <Button type="submit" className={cn("w-full my-2", status==='executing'? "animate-pulse":"" )}>Login</Button>

          </form>
          
      </Form>
      </div>
    </AuthCard>
  )
}