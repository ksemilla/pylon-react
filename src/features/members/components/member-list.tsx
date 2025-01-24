import { ErrorMessage } from "@/components/custom/error"
import { Loader } from "@/components/custom/loader"
import axios from "axios"
import { TablePagination } from "@/components/custom/table-pagination"
import { useQueryParams } from "@/hooks/use-queryparams"
import { useLocation } from "wouter"
import { Member } from "@/types/entity"
import { useMembers } from "../api/get-members"
import { MemberSearch } from "./member-search"
import { MemberTable } from "./member-table"

export function MemberListPage() {
  const [_, setLocation] = useLocation()
  const { getQueryParam } = useQueryParams()
  const offset = parseInt(getQueryParam("offset") ?? "0")
  const q = getQueryParam("q") ?? ""

  const { data, error } = useMembers({
    offset,
    q,
  })

  const onRowClick = (member: Member) => {
    setLocation(`/${JSON.stringify(member.id)}`)
  }

  if (axios.isAxiosError(error)) {
    return (
      <ErrorMessage title="Error" messages={[error.response?.data.detail]} />
    )
  }

  return (
    <div>
      <MemberSearch />
      {!data ? (
        <Loader />
      ) : (
        <>
          <MemberTable members={data?.data.items} onRowClick={onRowClick} />
          <TablePagination count={data?.data.count} />
        </>
      )}
    </div>
  )
}
