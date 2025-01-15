import { User } from "@/types/users"
import api from "./base"
import { ListResponse, PageOptions } from "@/types/core"

export const userList = (pageOptions?: PageOptions) => {
  return api.get<ListResponse<User>>("users/", {
    params: pageOptions,
  })
}

export const createUser = (data: User) => {
  return api.post<User>("users/", data)
}

export const editUser = (id: number, data: Partial<User>) => {
  return api.put<User>(`users/${id}/`, data)
}
