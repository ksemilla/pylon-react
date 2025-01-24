import { HasMemberPermission } from "@/components/custom/has-member-permission"
import { MemberPermissionEnum } from "../permissions"

export function MemberCreatePage() {
  return (
    <HasMemberPermission permission={MemberPermissionEnum.MEMBERS_CREATE}>
      <div>Member create</div>
    </HasMemberPermission>
  )
}
