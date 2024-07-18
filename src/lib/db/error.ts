export class DatabaseError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "DatabaseError"
  }
}

export enum AUTH_ERROR_CODE {
  NOT_AUTHENTICATED,
  INVALID_PASSWORD,
}

interface AuthErrorOptions {
  code: AUTH_ERROR_CODE
}

export class AuthError extends Error {
  code: AUTH_ERROR_CODE

  constructor(message: string, options: AuthErrorOptions) {
    super(message)
    this.name = "AuthError"
    this.code = options.code
  }
}
