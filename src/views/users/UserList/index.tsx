import { userList } from "@/api/users"
import { ErrorMessage } from "@/components/custom/error"
import { Loader } from "@/components/custom/loader"
import { Input } from "@/components/ui/input"
import { DEFAULT_PAGE_SIZE } from "@/consts"
import { useDebounce } from "@/hooks/use-debounce"
import { useQueryParams } from "@/lib/hooks"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { UserTable } from "./UserTable"
import { TablePagination } from "@/components/custom/table-pagination"
import { Plus, Search } from "lucide-react"
import { Link } from "wouter"
import { Button } from "@/components/ui/button"

export function UserList() {
  const { getQueryParam, setQueryParam, removeQueryParam } = useQueryParams()
  const offset = parseInt(getQueryParam("offset") ?? "0")
  const query = getQueryParam("q") ?? ""
  const [q, setQuery] = useDebounce<string>(query)

  const { data, error } = useQuery({
    queryKey: ["users", DEFAULT_PAGE_SIZE, offset, q],
    queryFn: async () => {
      return userList({ limit: DEFAULT_PAGE_SIZE, offset, q })
    },
  })

  if (axios.isAxiosError(error)) {
    return (
      <ErrorMessage title="Error" messages={[error.response?.data.detail]} />
    )
  }

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2 mb-1">
          <Search className="opacity-50" />
          <Input onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div>
          <Button asChild>
            <Link href="/users/create">
              Create New User{" "}
              <Plus aria-hidden="true" className="-mr-0.5 size-5" />
            </Link>
          </Button>
        </div>
      </div>
      {!data ? <Loader /> : <UserTable users={data?.data.items} />}
      <TablePagination
        onPrev={() => {
          if (offset > DEFAULT_PAGE_SIZE) {
            setQueryParam("offset", JSON.stringify(offset - DEFAULT_PAGE_SIZE))
          } else if (offset === DEFAULT_PAGE_SIZE) {
            removeQueryParam("offset")
          }
        }}
        onNext={() => {
          setQueryParam("offset", JSON.stringify(offset + DEFAULT_PAGE_SIZE))
        }}
        disabledPrev={offset < DEFAULT_PAGE_SIZE}
        disabledNext={(data?.data.count ?? 0) - offset <= DEFAULT_PAGE_SIZE}
      />
    </div>
  )
}
