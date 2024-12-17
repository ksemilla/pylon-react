export enum UserRole {
  SUPERUSER = "superuser",
  ADMIN = "admin",
  USER = "user",
}

export interface User {
  id: number
  email: string
  username: string
  firstName: string
  lastName: string
  picture: string
  dateJoined: string
  firebaseUid: string
  role: UserRole
}
