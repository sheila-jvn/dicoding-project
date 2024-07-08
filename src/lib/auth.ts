interface AuthStore {
  passkey?: string
}

/** This is mutable by design. Doesn't need to be reactive since it's only used for encryption */
export const auth: AuthStore = {
  passkey: undefined,
}
