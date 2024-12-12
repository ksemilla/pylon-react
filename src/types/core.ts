export interface ListResponse<T> {
  items: T[]
  count: number
}

export interface PageOptions {
  limit: number
  offset: number
}
