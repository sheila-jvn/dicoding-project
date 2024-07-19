import { DialogDelete } from "@/components/home/DialogDelete"
import { DialogExport } from "@/components/home/DialogExport/DialogExport"
import { OtpItem } from "@/components/OtpItem/"
import { Button } from "@/components/ui/button"
import { auth } from "@/lib/auth"
import { AuthError, DatabaseError, db } from "@/lib/db"
import { getOtps } from "@/services/otp"
import { Link, createFileRoute, redirect } from "@tanstack/react-router"
import { Plus } from "lucide-react"
import { toast } from "sonner"

export const Route = createFileRoute("/_layout/")({
  component: Index,
  loader: async () => {
    const otps = await getOtps()
    const raw = await db.getRaw()

    return { otps, raw }
  },
  beforeLoad: async () => {
    try {
      await getOtps()
    } catch (error) {
      auth.password = undefined
      toast.error((error as Error).message)

      if (error instanceof AuthError)
        throw redirect({ to: "/login", replace: true })
      if (error instanceof DatabaseError)
        throw redirect({ to: "/setup", replace: true })

      throw redirect({ to: "/login" })
    }
  },
})

function Index() {
  const data = Route.useLoaderData()

  return (
    <>
      <div className="flex w-full flex-wrap gap-2 rounded-lg border border-border p-6">
        <DialogExport raw={data.raw} />
        <DialogDelete />
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-4 rounded-[10px] border border-[#3f3f46] p-6">
        <Button asChild className="w-full">
          <Link to="/add">
            <Plus className="mr-2 h-4 w-4" /> Add 2FA
          </Link>
        </Button>
        {data.otps.map((otp) => (
          <OtpItem key={otp.id} {...otp} />
        ))}
      </div>
    </>
  )
}
