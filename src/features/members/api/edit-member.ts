import { api } from "@/lib/api-client"
import { Member } from "@/types/entity"

export function editMember({
  data,
  entityId,
  memberId,
}: {
  data: Partial<Member>
  entityId: number
  memberId: number
}) {
  return api.put(`entities/${entityId}/members/${memberId}/`, data)
}
