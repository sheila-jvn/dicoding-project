import { auth } from "@/lib/auth"
import { decryptString, encryptString } from "@/lib/crypto"
import { db } from "@/lib/db"

interface OtpRecord {
  id: string
  secret: string
  label?: string
  createdAt: number
}

interface Database {
  otps: Array<OtpRecord>
}

export async function init() {
  const { passkey } = auth
  if (!passkey) throw new Error("You are not authenticated")

  const encrypted = await encryptString(JSON.stringify({ otps: [] }), passkey)

  return db.set(encrypted)
}

async function getAll() {
  const records = await db.get()
  const { passkey } = auth

  if (!records) throw new Error("Database hasn't been initialized yet")
  if (!passkey) throw new Error("You are not authenticated")

  const decrypted = await decryptString(records, passkey)
  const parsed = JSON.parse(decrypted) as Database

  return parsed
}

export async function getOtps() {
  const { otps } = await getAll()
  return otps
}

export async function addOtp(record: Omit<OtpRecord, "id" | "createdAt">) {
  const data = await getAll()
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
