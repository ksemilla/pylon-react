import { User } from "@/types/users"
import api from "./base"

export const editUser = (id: number, data: Partial<User>) => {
  return api.put<User>(`users/${id}/`, data)
}
