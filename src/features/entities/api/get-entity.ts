import { api } from "@/lib/api-client"
import { QueryConfig } from "@/lib/react-query"
import { Entity } from "@/types/entity"
import { queryOptions, useQuery } from "@tanstack/react-query"

export const getEntity = ({ entityId }: { entityId: number }) => {
  return api.get<Entity>(`entities/${entityId}/`)
}

export const getEntityQueryOptions = (entityId: number) => {
  return queryOptions({
    enabled: !!entityId,
    queryKey: ["user", entityId],
    queryFn: () => getEntity({ entityId }),
  })
}

type UseEntityOptions = {
  entityId: number
  queryConfig?: QueryConfig<typeof getEntityQueryOptions>
}

export const useEntity = ({ entityId, queryConfig }: UseEntityOptions) => {
  return useQuery({
    ...getEntityQueryOptions(entityId),
    ...queryConfig,
  })
}
