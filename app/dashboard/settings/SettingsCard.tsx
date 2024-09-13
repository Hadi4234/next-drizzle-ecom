"use client"
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
import { Input } from "@/components/ui/input"
import { SettingsSchema } from "@/types/settings-schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Session } from "next-auth"
import Image from "next/image"
import { Switch } from "@/components/ui/switch"
import { FormError } from "@/components/auth/FormError"
import { FormSuccess } from "@/components/auth/FormSuccess"
import { useState } from "react"
import { useAction } from "next-safe-action/hooks"
import { settings } from "@/server/action/settings"
import { UploadButton } from "@/app/api/uploadthing/upload"

interface formSession {
  session: Session,
}

export default function SettingsCard(session: formSession) {

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [avatarUploading, setAvatarUploading] = useState(false);

  console.log(session.session.user)

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      password: undefined,
      newPassword: undefined,
      name: session.session.user?.name || undefined,
      image: session.session.user.image || undefined,
      email: session.session.user?.email || undefined,
      isTwoFactorEnabled: session.session.user?.isTwoFactorEnabled || false,

    },
  })
  const { execute, status } = useAction(settings, {
    onSuccess: (data) => {
      if (data?.success) setSuccess(data.success)
      if (data?.error) setError(data.error)
    },
    onError: (error) => {
      setError("Something went wrong")
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SettingsSchema>) {
    execute(values);
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Yours Settings</CardTitle>
        <CardDescription>Update your account settings </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="jhon doe" disabled={status === "executing"} {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <div className="flex items-center gap-4">
                    {!form.getValues("image") && (
                      <div className="font-bold">{
                        session.session.user?.name?.charAt(0).toUpperCase()
                      }
                      </div>
                    )}
                    {form.getValues("image") && (
                      <Image src={session.session.user?.image!} alt={session.session.user?.name!} width={42} height={42} />
                    )}
                    <UploadButton
                      className="scale-75 ut-button:ring-primary  ut-label:bg-red-50  ut-button:bg-primary/75  hover:ut-button:bg-primary/100 ut:button:transition-all ut-button:duration-500  ut-label:hidden ut-allowed-content:hidden"
                      endpoint="avatarUploader"
                      onUploadBegin={() => {
                        setAvatarUploading(true)
                      }}
                      onUploadError={(error) => {
                        form.setError("image", {
                          type: "validate",
                          message: error.message,
                        })
                        setAvatarUploading(false)
                        return
                      }}
                      onClientUploadComplete={(res) => {
                        form.setValue("image", res[0].url!)
                        setAvatarUploading(false)
                        return
                      }}
                      content={{
                        button({ ready }) {
                          if (ready) return <div>Change Avatar</div>
                          return <div>Uploading...</div>
                        },
                      }}
                    />

                  </div>
                  <FormControl>
                    <Input placeholder="Enter your image" type="hidden" disabled={status === "executing"} {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
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
                    <Input placeholder="*********" disabled={status === "executing"} {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" disabled={status === "executing"} {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isTwoFactorEnabled"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Two Factor Authentication</FormLabel>
                  <FormDescription>Enable two factor authentication</FormDescription>
                  <FormControl>
                    <Switch disabled={status === "executing"} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <FormSuccess message={success} />

            <Button type="submit" disabled={status === "executing" || avatarUploading}>Update your settings</Button>
          </form>
        </Form>
      </CardContent>

    </Card>
  )
}

