import { User } from "@/types/users"
import api from "./base"

export const userList = () => {
  return api.get<User[]>("users/")
}

export const getUser = (id: number) => {
  return api.get<User>(`users/${id}/`)
}
