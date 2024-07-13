interface AuthStore {
  password?: string
}

/** This is mutable by design. Doesn't need to be reactive since it's only used for encryption */
export const auth: AuthStore = {
  password: "your-secure-passkey",
}
