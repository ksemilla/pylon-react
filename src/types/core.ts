export interface ListResponse<T> {
  items: T[]
  count: number
}

export interface PageOptions {
  limit: number
  offset: number
  q?: string
}

export interface BaseResource {
  id?: number
}

export type Resource<T> = {
  [K in keyof T]: T[K]
} & BaseResource
