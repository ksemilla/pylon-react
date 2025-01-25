import { useParams } from "wouter"
import { useMember } from "../api/get-member"
import { MemberGeneralInfo } from "./member-general-info"
import { Loader } from "@/components/custom/loader"

export function MemberEditpage() {
  const { id = "0" } = useParams()

  const { data } = useMember({ memberId: parseInt(id) })

  console.log(data)

  if (!data) return <Loader />

  return (
    <div>
      <MemberGeneralInfo member={data.data} />
    </div>
  )
}
