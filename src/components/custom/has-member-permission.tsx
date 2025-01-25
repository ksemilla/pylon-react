import { MemberPermission } from "@/features/members/permissions"
import { hasMemberPermission } from "@/lib/utils"
import { ErrorMessage } from "./error"
import { useAuthStore } from "@/stores/auth"
import { useEntityStore } from "@/stores/entity"

type HasMemberPermission = {
  permission: MemberPermission
  children: React.ReactNode
}

export function HasMemberPermission({
  children,
  permission,
}: HasMemberPermission) {
  const user = useAuthStore((state) => state.user)
  const entityId = useEntityStore((state) => state.entityId)
  const member = user?.members.find((member) => member.entity.id === entityId)

  if (!hasMemberPermission(member, permission)) {
    return (
      <ErrorMessage
        title="Permission denied"
        messages={["You don't have permission to access this"]}
      />
    )
  }
  return <>{children}</>
}
