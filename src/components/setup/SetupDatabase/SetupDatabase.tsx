import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "@tanstack/react-router"
import { useForm } from "react-hook-form"
import { z } from "zod"

const schema = z
  .object({
    password: z.string().min(1, { message: "Password is required" }),
    passwordConfirm: z.string().min(1, { message: "Confirm your password" }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  })

type FormData = z.infer<typeof schema>

export function SetupDatabase() {
  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  })

  const onSubmit = async (data: FormData) => {
    const { password } = data
    auth.password = password

    await db.init()
    await router.invalidate()

    return router.navigate({ to: "/" })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-4 rounded-lg border border-border p-6"
      >
        <div className="grid gap-1">
          <h1 className="text-xl font-semibold">Setup a Password</h1>
          <p className="text-sm text-muted-foreground">
            This app uses a password to keep your accounts safe. Choose a strong
            password to unlock the app.
          </p>
        </div>

        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter a strong password"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Re-enter your password"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button>Continue</Button>
      </form>
    </Form>
  )
}
