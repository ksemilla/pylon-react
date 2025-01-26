import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Member, MemberRole } from "@/types/entity"
import { useState } from "react"
import { editMember } from "../api/edit-member"

type MemberGeneralInfoProps = {
  member: Member
}

export function MemberGeneralInfo({ member }: MemberGeneralInfoProps) {
  return (
    <div>
      <div className="grid grid-cols-12">
        <h2 className="col-span-3 scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0">
          {member.user.email}
        </h2>
        <div className="col-span-1">
          <ChangeRole member={member} />
        </div>
        <div className="col-span-1 flex justify-end">
          <div>
            <Label className="block">Is active?</Label>
            <ChangeIsActive member={member} />
          </div>
        </div>
      </div>
    </div>
  )
}

function ChangeRole({ member }: { member: Member }) {
  const onChange = async (role: "admin" | "user") => {
    try {
      const res = await editMember({
        entityId: 35,
        memberId: member.id ?? 0,
        data: {
          role,
        },
      })
      console.log("res", res)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Select
      defaultValue={member.role}
      onValueChange={(val: "admin" | "user") => {
        // setRole(val as "admin" | "user")
        onChange(val)
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={MemberRole.USER}>
          {MemberRole.USER.toUpperCase()}
        </SelectItem>
        <SelectItem value={MemberRole.ADMIN}>
          {MemberRole.ADMIN.toUpperCase()}
        </SelectItem>
      </SelectContent>
    </Select>
  )
}

function ChangeIsActive({ member }: { member: Member }) {
  const onChange = async (isChecked: boolean) => {
    try {
      const res = await editMember({
        entityId: 35,
        memberId: member.id ?? 0,
        data: {
          isActive: isChecked,
        },
      })
      console.log("res", res)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Switch
      defaultChecked={member.isActive}
      onCheckedChange={(v) => onChange(v)}
    />
  )
}
