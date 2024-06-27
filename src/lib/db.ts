import localforage from "localforage"

const storage = localforage.createInstance({
  driver: localforage.INDEXEDDB,
  name: "project-2fa",
  version: 1,
  storeName: "secrets",
  description: "OTP Secrets Database",
})

const RECORD_KEY = "otps"

export const db = {
  get: async () => {
    return await storage.getItem<string>(RECORD_KEY)
  },
  set: async (value: string) => {
    return storage.setItem(RECORD_KEY, value)
  },
}
