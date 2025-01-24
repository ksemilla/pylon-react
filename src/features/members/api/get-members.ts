import { queryOptions, useQuery } from "@tanstack/react-query"

import { api } from "@/lib/api-client"
import { QueryConfig } from "@/lib/react-query"
import { ListResponse, PageOptions } from "@/types/core"
import { DEFAULT_PAGE_SIZE } from "@/consts"
import { Member } from "@/types/entity"
import { useEntityStore } from "@/stores/entity"

export const getMembers = ({
  pageOptions,
  entityId,
}: {
  pageOptions?: PageOptions
  entityId: number
}) => {
  return api.get<ListResponse<Member>>(`entities/${entityId}/members/`, {
    params: pageOptions,
  })
}

export const getMembersQueryOptions = ({
  offset = 0,
  q,
}: { offset?: number; q?: string } = {}) => {
  const entityId = useEntityStore((state) => state.entityId) ?? 0
  return queryOptions({
    enabled: !!entityId,
    queryKey: ["entities", entityId, "members", DEFAULT_PAGE_SIZE, offset, q],
    queryFn: async () =>
      await getMembers({
        entityId,
        pageOptions: {
          limit: DEFAULT_PAGE_SIZE,
          offset,
          q,
        },
      }),
  })
}

type UseMembersOptions = {
  offset?: number
  q?: string
  queryConfig?: QueryConfig<typeof getMembersQueryOptions>
}

export const useMembers = ({ q, offset, queryConfig }: UseMembersOptions) => {
  return useQuery({
    ...getMembersQueryOptions({ offset, q }),
    ...queryConfig,
  })
}
