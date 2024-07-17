import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { zodResolver } from "@hookform/resolvers/zod"
import { createFileRoute, redirect } from "@tanstack/react-router"
import { useForm } from "react-hook-form"
import { z } from "zod"

export const Route = createFileRoute("/_layout/login")({
  component: Login,
  beforeLoad: async () => {
    if (!(await db.exists())) throw redirect({ to: "/setup" })

    const { password } = auth
    if (password) throw redirect({ to: "/" })
  },
})

const schema = z.object({
  password: z.string().min(1, { message: "Password is required" }),
})

type FormData = z.infer<typeof schema>

function Login() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
    },
  })

  const onSubmit = async (data: FormData) => {
    const { password } = data
    auth.password = password

    await redirect({ to: "/" })
  }

  return (
    <div className="grid gap-4 rounded-lg border border-border p-6">
      <div className="grid gap-1">
        <h1 className="text-xl font-semibold">Enter your Password</h1>
        <p className="text-sm text-muted-foreground">
          This app uses a password to keep your accounts safe. Choose a strong
          password to unlock the app.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(authenticate)} className="grid gap-2">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input type="password" placeholder="Enter your password" />
          <Button type="submit">Sign In</Button>
        </div>
      </form>
    </div>
  )
}
