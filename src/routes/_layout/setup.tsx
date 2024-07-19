import { ImportDatabase } from "@/components/setup/ImportDatabase"
import { SetupDatabase } from "@/components/setup/SetupDatabase"
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
    <>
      <SetupDatabase />
      <ImportDatabase />
    </>
  )
}
