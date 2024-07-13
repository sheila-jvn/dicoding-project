import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { db } from "@/lib/db"
import { getOtps } from "@/services/otp"
import { addOtp } from "@/services/otp"
import { Link, createFileRoute } from "@tanstack/react-router"
import { ArrowLeft, Camera } from "lucide-react"
import { useState } from "react"

export const Route = createFileRoute("/_layout/add")({
  component: Add,
  loader: async () => {
    await db.init()
    return getOtps()
  },
})

function Add() {
  const data = Route.useLoaderData()
  const [label, setLabel] = useState("")
  const [secret, setSecret] = useState("")
  const [message, setMessage] = useState("")

  const handleSave = async () => {
    if (label && secret) {
      try {
        const newOtp = await addOtp({ label, secret })
        setMessage(`OTP added with ID: ${newOtp.id}`)
        // Reset form fields
        setLabel("")
        setSecret("")
      } catch (error) {
        setMessage("Failed to add OTP")
      }
    } else {
      setMessage("Both label and secret are required")
    }
  }

  return (
    <>
      <div className="flex w-full items-center gap-4 rounded-[10px] border border-[#3f3f46] p-6">
        <Button
          asChild
          className="border-[1px] border-[#3f3f46] bg-transparent text-white hover:text-black"
        >
          <Link to="/">
            <ArrowLeft />
          </Link>
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
        <div className="grid w-full gap-2">
          <div className="grid gap-1.5">
            <Label htmlFor="label">Label</Label>
            <Input
              type="text"
              id="label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Enter a label"
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="secret">Secret Key</Label>
            <Input
              type="text"
              id="secret"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Enter a secret key"
            />
          </div>
        </div>

        <Button className="w-full" onClick={handleSave}>
          Save
        </Button>
        {message && <p>{message}</p>}
      </div>
    </>
  )
}
