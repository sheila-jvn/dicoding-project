import { auth } from "@/lib/auth"
import { encryptString } from "@/lib/crypto"
import { OtpRecord, db } from "@/lib/db"

export async function getOtps() {
  const { otps } = await db.get()
  return otps
}

export async function addOtp(record: Omit<OtpRecord, "id" | "createdAt">) {
  const data = await db.get()
  const { passkey } = auth

  const id = crypto.randomUUID()
  const createdAt = Date.now()

  if (!passkey) throw new Error("You are not authenticated")

  const newOtp: OtpRecord = { ...record, id, createdAt }
  data.otps.push(newOtp)

  const encrypted = await encryptString(JSON.stringify(data), passkey)

  await db.set(encrypted)
  return newOtp
}
