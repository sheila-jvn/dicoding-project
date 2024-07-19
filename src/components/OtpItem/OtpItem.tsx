import { OtpRecord } from "@/lib/db"
import { TOTP } from "otpauth"
import { useEffect, useRef, useState } from "react"

export function OtpItem(props: OtpRecord) {
  const [token, setToken] = useState<string>("")
  const [seconds, setSeconds] = useState<number>(0)

  // Ref to hold the TOTP instance
  const totpRef = useRef<TOTP | null>(null)

  useEffect(() => {
    // Initialize the TOTP instance
    totpRef.current = new TOTP({ secret: props.secret, label: props.label })

    // Function to update the token and seconds
    const updateTokenAndSeconds = () => {
      if (totpRef.current) {
        const newToken = totpRef.current.generate()
        const newSeconds =
          totpRef.current.period -
          (Math.floor(Date.now() / 1000) % totpRef.current.period)
        setToken(newToken)
        setSeconds(newSeconds)
      }
    }

    // Initial update
    updateTokenAndSeconds()

    // Set up an interval to update every second
    const interval = setInterval(updateTokenAndSeconds, 1000)

    // Clean up the interval on component unmount
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex w-full items-center justify-between gap-4 rounded-lg border border-border p-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-normal text-[#a1a1aa]">{props.label}</p>
        <p className="text-2xl font-semibold">{token}</p>
      </div>
      <p className="text-2xl font-normal">{seconds}s</p>
    </div>
  )
}
