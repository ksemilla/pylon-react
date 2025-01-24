import { HasMemberPermission } from "@/components/custom/has-member-permission"
import { MemberPermissionEnum } from "../permissions"
import { MemberCreateForm } from "./member-create-form"
import { useCreateMember } from "../api/create-member"

export function MemberCreatePage() {
  const { mutate } = useCreateMember()

  return (
    <HasMemberPermission permission={MemberPermissionEnum.MEMBERS_CREATE}>
      <div className="max-w-xl">
        <MemberCreateForm onSubmit={mutate} />
      </div>
    </HasMemberPermission>
  )
}
