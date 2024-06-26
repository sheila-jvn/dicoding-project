import { auth } from "@/lib/auth"
import { decryptString, encryptString } from "@/lib/crypto"
import localforage from "localforage"

const RECORD_KEY = "records"
const KEY_STORE = "otps"

const storage = localforage.createInstance({
  name: "project-2fa",
  storeName: KEY_STORE,
  description: "OTP Secrets Database",
  driver: localforage.INDEXEDDB,
  version: 1,
})

export interface OtpRecord {
  id: string
  secret: string
  label?: string
  createdAt: number
}

interface Database {
  otps: Array<OtpRecord>
}

export const db = {
  init: () => db.set({ otps: [] }),

  get: async () => {
    const records = await storage.getItem<string>(RECORD_KEY)
    const { passkey } = auth

    if (!records) throw new Error("Database hasn't been initialized yet")
    if (!passkey) throw new Error("You are not authenticated")

    const decrypted = await decryptString(records, passkey)
    const parsed = JSON.parse(decrypted) as Database

    return parsed
  },

  set: async (value: Database) => {
    const { passkey } = auth
    if (!passkey) throw new Error("You are not authenticated")

    const encrypted = await encryptString(JSON.stringify(value), passkey)

    return storage.setItem(RECORD_KEY, encrypted)
  },
}
