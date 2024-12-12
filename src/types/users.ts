export enum UserRole {
  SUPERUSER = "superuser",
  ADMIN = "admin",
  USER = "user",
}

export interface User {
  id: number
  email: string
  username: string
  picture: string
  dateJoined: string
  firebaseUid: string
  role: UserRole
}
