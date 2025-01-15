import { api } from "@/lib/api-client"
import { QueryConfig } from "@/lib/react-query"
import { User } from "@/types/users"
import { queryOptions, useQuery } from "@tanstack/react-query"

export const getUser = ({ userId }: { userId: number }) => {
  return api.get<User>(`users/${userId}/`)
}

export const getUserQueryOptions = (userId: number) => {
  return queryOptions({
    enabled: !!userId,
    queryKey: ["user", userId],
    queryFn: () => getUser({ userId }),
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
