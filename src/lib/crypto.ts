const encoder = new TextEncoder()
const decoder = new TextDecoder()

async function generateKeyFromPasskey(
  passkey: string,
  salt: Uint8Array,
): Promise<CryptoKey> {
  const keyMaterial = await globalThis.crypto.subtle.importKey(
    "raw",
    encoder.encode(passkey),
    { name: "PBKDF2" },
    false,
    ["deriveKey"],
  )

  return await globalThis.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"],
  )
}

export async function encryptString(
  plainText: string,
  passkey: string,
): Promise<string> {
  const salt = globalThis.crypto.getRandomValues(new Uint8Array(16))
  const iv = globalThis.crypto.getRandomValues(new Uint8Array(12))

  const key = await generateKeyFromPasskey(passkey, salt)

  const encrypted = await globalThis.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    encoder.encode(plainText),
  )

  const encryptedBuffer = new Uint8Array(encrypted)
  const combinedBuffer = new Uint8Array(
    salt.length + iv.length + encryptedBuffer.length,
  )

  combinedBuffer.set(salt)
  combinedBuffer.set(iv, salt.length)
  combinedBuffer.set(encryptedBuffer, salt.length + iv.length)

  return btoa(String.fromCharCode(...combinedBuffer))
}

export async function decryptString(
  encryptedString: string,
  passkey: string,
): Promise<string> {
  const combinedBuffer = Uint8Array.from(atob(encryptedString), (c) =>
    c.charCodeAt(0),
  )

  const salt = combinedBuffer.slice(0, 16)
  const iv = combinedBuffer.slice(16, 28)
  const cipherText = combinedBuffer.slice(28)

  const key = await generateKeyFromPasskey(passkey, salt)

  const decrypted = await globalThis.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    cipherText,
  )

  return decoder.decode(decrypted)
}

const passkey = "your-secure-passkey"

const rawString = "some string"

const encrypted = await encryptString(rawString, passkey)
const decrypted = await decryptString(encrypted, passkey)

console.log({ encrypted, decrypted })
console.log(await decryptString(encrypted, "wrong-passkey"))
