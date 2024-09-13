"use client"

import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { AuthCard } from "./AuthCard"
import {zodResolver} from '@hookform/resolvers/zod'
import { RegisterSchema } from "@/types/register-schema"
import * as z from "zod";
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Link from "next/link"
import { emailSignIn } from "@/server/action/emailSignIn"
import {useAction } from 'next-safe-action/hooks'
import { cn } from "@/lib/utils"
import { useState } from "react"
import { emailRegister } from "@/server/action/emailRegister"
import { FormError } from "./FormError"
import { FormSuccess } from "./FormSuccess"
export const RegisterForm = () => {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name:"",
      email: "",
      password: "",
    }

  })
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const{ execute , status} = useAction(emailRegister, {
    onSuccess(data) {
      if (data.success) {

        
        if (data?.success) {
          setSuccess(data.success)
        }else{
          setError(data.error)
        }
        // if (data?.error) {
        //   setError(data.error) 
        // }
      }
    },
    
  })
  const onSubmit = (value: z.infer<typeof RegisterSchema>) => {
  //  console.log("before server action run")
    execute(value)
  }
  return (
    <AuthCard
      cardTitle="Create an account"
      backButtonHref="/auth/login"
      backButtonLabel="Already have an account?"
      showSocials
    >
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
           <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter your username"  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
              )}
            />
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter your email" autoComplete="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
              )}
            /> 
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
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button size={'sm'} variant={'link'} asChild>
              <Link href={'/auth/reset'} >Forgot your password
              </Link>
            
            </Button>
            <Button type="submit" className={cn("w-full my-2", status==='executing'? "animate-pulse":"" )}>Register</Button>

          </form>
          
      </Form>
      </div>
    </AuthCard>
  )
}