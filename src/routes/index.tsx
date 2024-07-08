import { OtpItem } from "@/components/OtpItem/"
import { Button } from "@/components/ui/button"
import { getOtps } from "@/services/otp"
import { createFileRoute, redirect } from "@tanstack/react-router"
import { UploadCloud } from "lucide-react"

export const Route = createFileRoute("/")({
  component: Index,
  loader: async () => {
    return getOtps()
  },
  beforeLoad: async () => {
    try {
      await getOtps()
    } catch (error) {
      throw redirect({ to: "/login" })
    }
  },
})

const dataOtps = [
  {
    email: "ZbPqz@example.com",
    otp: "123456",
    timer: 30,
  },
  {
    email: "ZbPqz@snxaknxk.com",
    otp: "027455",
    timer: 30,
  },
  {
    email: "ZbPqz@sadnwjkan.com",
    otp: "936475",
    timer: 30,
  },
  {
    email: "asnbdcjkwaenjkdn.com",
    otp: "145724",
    timer: 30,
  },
]

function Index() {
  const data = Route.useLoaderData()

  console.log({ data })

  return (
    <div className="mx-auto mt-4 flex w-[448px] flex-col items-center gap-4">
      <div className="flex w-full flex-col items-center gap-2 rounded-[10px] border border-[#3f3f46] p-6">
        <Button>
          Sync w/ Google Drive <UploadCloud className="ml-2 h-4 w-4" />
        </Button>
        <p className="mt-2">
          For security, this app only accesses files it creates.
        </p>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-4 rounded-[10px] border border-[#3f3f46] p-6">
        <Button className="w-full">Add 2FA</Button>
        {dataOtps.map((otp) => (
          <OtpItem
            key={otp.email}
            email={otp.email}
            otp={otp.otp}
            timer={otp.timer}
          />
        ))}
      </div>
    </div>
  )
}
