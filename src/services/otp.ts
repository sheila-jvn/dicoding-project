import { OtpRecord, db } from "@/lib/db"

export async function getOtps() {
  const { otps } = await db.get()
  return otps
}

export async function addOtp(record: Omit<OtpRecord, "id" | "createdAt">) {
  const data = await db.get()

  const id = crypto.randomUUID()
  const createdAt = Date.now()

  const newOtp: OtpRecord = { ...record, id, createdAt }
  data.otps.push(newOtp)

  await db.set(data)
  return newOtp
}
