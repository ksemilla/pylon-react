import { Resource } from "./core"

export enum UserRole {
  SUPERUSER = "superuser",
  ADMIN = "admin",
  USER = "user",
}

export type User = Resource<{
  email: string
  username?: string
  firstName?: string
  lastName?: string
  picture?: string
  dateJoined?: string
  firebaseUid?: string
  role: `${UserRole}`
  isActive: boolean
}>
