import { MemberPermission } from "@/features/members/permissions"
import { useMember } from "@/hooks/use-member"
import { hasMemberPermission } from "@/lib/utils"
import { ErrorMessage } from "./error"

type HasMemberPermission = {
  permission: MemberPermission
  children: React.ReactNode
}

export function HasMemberPermission({
  children,
  permission,
}: HasMemberPermission) {
  const member = useMember()
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
