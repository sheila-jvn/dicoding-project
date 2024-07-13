import { OtpItem } from "@/components/OtpItem/"
import { Button } from "@/components/ui/button"
import { auth } from "@/lib/auth"
import { AuthError, DatabaseError, OtpRecord } from "@/lib/db"
import { getOtps } from "@/services/otp"
import { Link, createFileRoute, redirect } from "@tanstack/react-router"
import { LogOut, UploadCloud } from "lucide-react"
import { useState } from "react"

export const Route = createFileRoute("/_layout/")({
  component: Index,
  loader: async () => {
    return getOtps()
  },
  beforeLoad: async () => {
    try {
      await getOtps()
    } catch (error) {
      if (error instanceof AuthError) throw redirect({ to: "/login" })
      if (error instanceof DatabaseError) throw redirect({ to: "/setup" })

      auth.password = undefined
      throw redirect({ to: "/login" })
    }
  },
})

const dataOtps: Array<OtpRecord> = [
  {
    id: "1",
    secret: "I65VU7K5ZQL7WB4E",
    label: "ZbPqz@example.com",
    createdAt: 30,
  },
  {
    id: "2",
    secret: "I65VU7K5ZQL7WB4E",
    label: "jhdfbchea@example.com",
    createdAt: 30,
  },
  {
    id: "3",
    secret: "I65VU7K5ZQL7WB4E",
    label: "asdwWD@example.com",
    createdAt: 30,
  },
  {
    id: "4",
    secret: "I65VU7K5ZQL7WB4E",
    label: "wdwqd@example.com",
    createdAt: 30,
  },
]

function Index() {
  const data = Route.useLoaderData()
  const [isSynced, setIsSynced] = useState(false)

  const handleSync = () => {
    setIsSynced(true)
  }

  console.log({ data })

  return (
    <>
      {!isSynced ?
        <div className="flex w-full flex-col items-center gap-2 rounded-[10px] border border-[#3f3f46] p-6">
          <Button onClick={handleSync}>
            Sync w/ Google Drive <UploadCloud className="ml-2 h-4 w-4" />
          </Button>
          <p className="mt-2">
            For security, this app only accesses files it creates.
          </p>
        </div>
      : <div className="flex w-full items-center justify-between gap-2 rounded-[10px] border border-[#3f3f46] p-6">
          <Button>
            Sign Out <LogOut className="ml-2 h-4 w-4" />
          </Button>
          <div className="text-right">
            <p className="text-base font-normal">johndoe@gmail.com</p>
            <p className="text-sm font-normal text-[#a1a1aa]">
              Last synced: 16/6/24 22:00
            </p>
          </div>
        </div>
      }

      <div className="flex w-full flex-col items-center justify-center gap-4 rounded-[10px] border border-[#3f3f46] p-6">
        <Button asChild className="w-full">
          <Link to="/add">Add 2FA</Link>
        </Button>
        {dataOtps.map((otp) => (
          <OtpItem key={otp.id} {...otp} />
        ))}
      </div>
    </>
  )
}
