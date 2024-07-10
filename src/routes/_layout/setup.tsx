import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_layout/setup")({
  component: Setup,
  beforeLoad: async () => {
    const dbExists = await db.exists()
    const hasPassword = Boolean(auth.password)

    if (dbExists && hasPassword) throw redirect({ to: "/" })
    if (dbExists && !hasPassword) throw redirect({ to: "/login" })

    auth.password = undefined
  },
})

function Setup() {
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
        <div className="grid gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="Enter a strong password"
          />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="password">Re-enter Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="Re-enter your password"
          />
        </div>
      </div>

      <Button>Continue</Button>
    </div>
  )
}
