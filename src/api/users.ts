import { User } from "@/types/users"
import api from "./base"
import { ListResponse, PageOptions } from "@/types/core"

export const userList = (pageOptions?: PageOptions) => {
  return api.get<ListResponse<User>>("users/", {
    params: pageOptions,
  })
}

export const getUser = (id: number) => {
  return api.get<User>(`users/${id}/`)
}
