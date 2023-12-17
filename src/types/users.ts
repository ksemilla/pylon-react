export type User = {
  id?: number
  email: string
  password: string
  role: Role
}

export enum Role {
  ADMIN = "admin",
  USER = "user",
}
