import { Button } from "@/components/ui/button"
import { db } from "@/lib/db"
import { getOtps } from "@/services/otp"
import { Link, createFileRoute } from "@tanstack/react-router"
import { ArrowLeft, Camera } from "lucide-react"

export const Route = createFileRoute("/add")({
  component: Add,
  loader: async () => {
    await db.init()
    return getOtps()
  },
})

function Add() {
  const data = Route.useLoaderData()

  console.log({ data })

  return (
    <div className="mx-auto mt-4 flex w-[448px] flex-col items-center gap-4">
      <div className="flex w-full items-center gap-4 rounded-[10px] border border-[#3f3f46] p-6">
        <Button asChild className="border-[1px] border-[#3f3f46] bg-transparent text-white hover:text-black">
          <Link to="/"><ArrowLeft /></Link>
        </Button>
        <p className="text-xl font-semibold">Add a new 2FA</p>
      </div>

      <div className="flex w-full flex-col items-start gap-4 rounded-[10px] border border-[#3f3f46] p-6">
        <div className="flex flex-col gap-1">
          <p className="text-base">Add Using QR Code</p>
          <p className="text-sm text-muted-foreground">
            To add an account quickly, scan the QR code provided by your
            service.
          </p>
        </div>
        <Button>
          <Camera className="mr-2" />
          Scan QR Code
        </Button>
      </div>

      <div className="flex w-full flex-col items-start gap-4 rounded-[10px] border border-[#3f3f46] p-6">
        <div className="flex flex-col gap-1">
          <p className="text-base">Add Secret Manually</p>
          <p className="text-sm text-muted-foreground">
            If you don't have a QR code, enter the secret key provided by your
            service.
          </p>
        </div>
        <div className="flex gap-4 w-full">
          <input className="w-full bg-transparent rounded-md border-[1px] border-[#3f3f46] p-2" placeholder="Secret Key"></input>
          <Button>Save</Button>
        </div>
      </div>
    </div>
  )
}
