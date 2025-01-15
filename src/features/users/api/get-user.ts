import { api } from "@/lib/api-client"
import { QueryConfig } from "@/lib/react-query"
import { User } from "@/types/users"
import { queryOptions, useQuery } from "@tanstack/react-query"

export const getUser = (id: number) => {
  return api.get<User>(`users/${id}/`)
}

export const getUserQueryOptions = (id: number) => {
  return queryOptions({
    enabled: !!id,
    queryKey: ["user", id],
    queryFn: () => getUser(id),
  })
}

type UseUserOptions = {
  id: number
  queryConfig?: QueryConfig<typeof getUserQueryOptions>
}

export const useUser = ({ id, queryConfig }: UseUserOptions) => {
  return useQuery({
    ...getUserQueryOptions(id),
    ...queryConfig,
  })
}
