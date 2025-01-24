import { useAuthStore } from "@/stores/auth"
import { useEntityStore } from "@/stores/entity"

export const useMember = () => {
  const user = useAuthStore((state) => state.user)
  const entityId = useEntityStore((state) => state.entityId)

  const member = user?.members.find((member) => member.entity.id === entityId)
  return member
}
