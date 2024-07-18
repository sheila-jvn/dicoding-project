import { Input } from "@/components/ui/input"
import { AuthError } from "@/lib/db"
import { convertToImageData } from "@/lib/image"
import { parseOtpUrl } from "@/lib/totp"
import { addOtp } from "@/services/otp"
import { useRouter } from "@tanstack/react-router"
import jsQR from "jsqr"
import { toast } from "sonner"

export function UploadQR() {
  const router = useRouter()

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0]
      if (!file) throw new Error("No file selected")

      const imageData = await convertToImageData(file)
      const code = jsQR(imageData.data, imageData.width, imageData.height)

      if (!code) throw new Error("No QR code found / Invalid QR code")

      const parsed = parseOtpUrl(code.data)

      await addOtp(parsed)
      toast.success("2FA added successfully")
      return router.navigate({ to: "/" })
    } catch (error) {
      toast.error((error as Error).message)

      if (error instanceof AuthError)
        router.navigate({ to: "/login", replace: true })
    }
  }

  return (
    <div className="flex w-full flex-col items-start gap-4 rounded-lg border border-border p-6">
      <div className="flex flex-col gap-1">
        <p className="text-base">Add Using QR Code</p>
        <p className="text-sm text-muted-foreground">
          To add an account quickly, scan the QR code provided by your service.
          Scanning using camera is available only on mobile devices.
        </p>
      </div>

      <Input type="file" accept="image/*" onChange={onFileChange} />
    </div>
  )
}
