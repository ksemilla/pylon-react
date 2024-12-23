import api from "./base"
import { ListResponse, PageOptions } from "@/types/core"
import { Entity } from "@/types/entity"

export const entityList = (pageOptions?: PageOptions) => {
  return api.get<ListResponse<Entity>>("entities/", {
    params: pageOptions,
  })
}

// export const getUser = (id: number) => {
//   return api.get<User>(`users/${id}/`)
// }

export const createEntity = (data: FormData) => {
  return api.post<Entity>(`entities/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  })
}
