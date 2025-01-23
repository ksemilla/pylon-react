export interface Entity {
  id?: number
  name: string
  slug: string
  photo?: FileList

  isActive?: boolean
}

export const MemberRole = {
  ADMIN: "admin",
  USER: "user",
} as const

export interface Member {
  id?: number
  role: (typeof MemberRole)[keyof typeof MemberRole]
  permissions: string[]
  default: boolean
}
