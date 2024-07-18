import { OtpRecord } from "./db"

export function parseOtpUrl(url: string): Omit<OtpRecord, "id" | "createdAt"> {
  const parsed = new URL(url)

  const secret = parsed.searchParams.get("secret")
  const label = parsed.pathname.split("/").pop()

  if (!secret) throw new Error("OTP secret not found in URL")

  return { secret, label: label || "No label" }
}
