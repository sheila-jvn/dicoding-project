import { TOTP } from "otpauth"

const totp = new TOTP({
  secret: "I65VU7K5ZQL7WB4E",
})

// Generate a token (returns the current token as a string).
const token = totp.generate()

// Get the remaining seconds until the current token changes.
const seconds = totp.period - (Math.floor(Date.now() / 1000) % totp.period)

console.log({ totp, token, seconds })

interface OtpItem {
  secret: string
  label: string
}

function parseOtpUrl(url: string): OtpItem {
  const parsed = new URL(url)

  const secret = parsed.searchParams.get("secret")
  const label = parsed.pathname.split("/").pop()

  if (!secret) throw new Error("OTP secret not found in URL")

  return { secret, label: label || "No label" }
}

console.log({ url })
