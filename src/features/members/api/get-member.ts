import { queryOptions, useQuery } from "@tanstack/react-query"

import { api } from "@/lib/api-client"
import { QueryConfig } from "@/lib/react-query"
import { Member } from "@/types/entity"
import { useEntityStore } from "@/stores/entity"

export const getMember = ({
  memberId,
  entityId,
}: {
  memberId: number
  entityId: number
}) => {
  return api.get<Member>(`entities/${entityId}/members/${memberId}/`)
}

export const getMemberQueryOptions = ({ memberId }: { memberId: number }) => {
  const entityId = useEntityStore((state) => state.entityId) ?? 0
  return queryOptions({
    enabled: !!entityId && !!memberId,
    queryKey: ["entities", entityId, "members", memberId],
    queryFn: async () =>
      await getMember({
        entityId,
        memberId,
      }),
  })
}

type UseMemberOptions = {
  memberId: number
  queryConfig?: QueryConfig<typeof getMemberQueryOptions>
}

export const useMember = ({ memberId, queryConfig }: UseMemberOptions) => {
  return useQuery({
    ...getMemberQueryOptions({ memberId }),
    ...queryConfig,
  })
}
