import { queryOptions, useQuery } from "@tanstack/react-query"

import { api } from "@/lib/api-client"
import { QueryConfig } from "@/lib/react-query"
import { ListResponse, PageOptions } from "@/types/core"
import { DEFAULT_PAGE_SIZE } from "@/consts"
import { Entity } from "@/types/entity"

export const getEntities = (pageOptions?: PageOptions) => {
  return api.get<ListResponse<Entity>>("entities/", {
    params: pageOptions,
  })
}

export const getEntitiesQueryOptions = ({
  offset = 0,
  q,
}: { offset?: number; q?: string } = {}) => {
  return queryOptions({
    queryKey: ["users", DEFAULT_PAGE_SIZE, offset, q],
    queryFn: () =>
      getEntities({
        limit: DEFAULT_PAGE_SIZE,
        offset,
        q,
      }),
  })
}

type UseEntitiesOptions = {
  offset?: number
  q?: string
  queryConfig?: QueryConfig<typeof getEntitiesQueryOptions>
}

export const useEntities = ({ q, offset, queryConfig }: UseEntitiesOptions) => {
  return useQuery({
    ...getEntitiesQueryOptions({ offset, q }),
    ...queryConfig,
  })
}
