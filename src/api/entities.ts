import api from "./base"
import { ListResponse, PageOptions } from "@/types/core"
import { Entity } from "@/types/entity"

export const entityList = (pageOptions?: PageOptions) => {
  return api.get<ListResponse<Entity>>("entities/", {
    params: pageOptions,
  })
}

export const getEntity = (id: number) => {
  return api.get<Entity>(`entities/${id}/`)
}

export const createEntity = (data: FormData) => {
  return api.post<Entity>(`entities/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  })
}

export const editEntity = (id: number, data: FormData) => {
  return api.put<Entity>(`entities/${id}/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  })
}
