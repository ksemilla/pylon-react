import { queryOptions, useQuery } from "@tanstack/react-query"

import { api } from "@/lib/api-client"
import { QueryConfig } from "@/lib/react-query"
import { ListResponse, PageOptions } from "@/types/core"
import { User } from "@/types/users"
import { DEFAULT_PAGE_SIZE } from "@/consts"

export const getUsers = (pageOptions?: PageOptions) => {
  return api.get<ListResponse<User>>("users/", {
    params: pageOptions,
  })
}

export const getUsersQueryOptions = ({
  offset = 0,
  q,
}: { offset?: number; q?: string } = {}) => {
  return queryOptions({
    queryKey: ["users", DEFAULT_PAGE_SIZE, offset, q],
    queryFn: () =>
      getUsers({
        limit: DEFAULT_PAGE_SIZE,
        offset,
        q,
      }),
  })
}

type UseUsersOptions = {
  offset?: number
  q?: string
  queryConfig?: QueryConfig<typeof getUsersQueryOptions>
}

export const useUsers = ({ q, offset, queryConfig }: UseUsersOptions) => {
  return useQuery({
    ...getUsersQueryOptions({ offset, q }),
    ...queryConfig,
  })
}
