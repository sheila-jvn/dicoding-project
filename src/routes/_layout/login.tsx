import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_layout/login")({
  component: Login,
  beforeLoad: async () => {
    if (!(await db.exists())) throw redirect({ to: "/setup" })

    const { password } = auth
    if (password) throw redirect({ to: "/" })
  },
})

function Login() {
  return (
    <div className="grid gap-4 rounded-lg border border-border p-6">
      <div className="grid gap-1">
        <h1 className="text-xl font-semibold">Setup a Password</h1>
        <p className="text-sm text-muted-foreground">
          This app uses a password to keep your accounts safe. Choose a strong
          password to unlock the app.
        </p>
      </div>

      <div className="grid gap-2">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input type="email" placeholder="Email" />
          <Button type="submit">Subscribe</Button>
        </div>
      </div>
    </div>
  )
}
