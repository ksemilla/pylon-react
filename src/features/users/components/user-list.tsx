import { userList } from "@/api/users"
import { ErrorMessage } from "@/components/custom/error"
import { Loader } from "@/components/custom/loader"
import { DEFAULT_PAGE_SIZE } from "@/consts"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { TablePagination } from "@/components/custom/table-pagination"
import { useQueryParams } from "@/hooks/use-queryparams"
import { User } from "@/types/users"
import { useLocation } from "wouter"
import { UserSearch } from "./user-search"
import { UserTable } from "./user-table"

export function UserListPage() {
  const [_, setLocation] = useLocation()
  const { getQueryParam } = useQueryParams()
  const offset = parseInt(getQueryParam("offset") ?? "0")
  const q = getQueryParam("q") ?? ""

  const { data, error } = useQuery({
    queryKey: ["users", DEFAULT_PAGE_SIZE, offset, q],
    queryFn: async () => {
      return userList({ limit: DEFAULT_PAGE_SIZE, offset, q })
    },
  })

  const onRowClick = (user: User) => {
    setLocation(`/${JSON.stringify(user.id)}`)
  }

  if (axios.isAxiosError(error)) {
    return (
      <ErrorMessage title="Error" messages={[error.response?.data.detail]} />
    )
  }

  return (
    <div>
      <UserSearch />
      {!data ? (
        <Loader />
      ) : (
        <UserTable
          users={data?.data.items}
          onRowClick={onRowClick}
          pagination={<TablePagination count={data?.data.count} />}
        />
      )}
    </div>
  )
}
