export type User = {
  email: string
  password: string
  role: Role
}

export enum Role {
  ADMIN = "admin",
  USER = "user",
}
