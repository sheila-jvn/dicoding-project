import { Button } from "@/components/ui/button"
import { createLazyFileRoute } from "@tanstack/react-router"
import { UploadCloud } from "lucide-react"

export const Route = createLazyFileRoute("/")({
  component: Index,
})

function Index() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-[450px] flex-col items-center gap-2 rounded-[10px] border border-[#3f3f46] p-6">
        <Button className="w-[208px]">
          Sync w/ Google Drive <UploadCloud className="ml-2 h-4 w-4" />
        </Button>
        <p className="leading-7 [&:not(:first-child)]:mt-2">
          For security, this app only accesses files it creates.
        </p>
      </div>

      <div className="flex w-[450px] flex-col items-center justify-center gap-4 rounded-[10px] border border-[#3f3f46] p-6">
        <Button className="w-full">Add 2FA</Button>
      </div>
    </div>
  )
}
