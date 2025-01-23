import { Resource } from "./core"
import { Member } from "./entity"

export const UserRole = {
  SUPERUSER: "superuser",
  ADMIN: "admin",
  USER: "user",
} as const

export type User = Resource<{
  email: string
  username?: string
  firstName?: string
  lastName?: string
  picture?: string
  dateJoined?: string
  firebaseUid?: string
  role: (typeof UserRole)[keyof typeof UserRole]
  isActive: boolean

  members: Member[]
}>
