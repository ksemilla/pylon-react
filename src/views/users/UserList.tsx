import { userList } from "@/api/users"
import { ErrorMessage } from "@/components/custom/error"
import { Loader } from "@/components/custom/loader"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DEFAULT_PAGE_SIZE } from "@/consts"
import { useQueryParams } from "@/lib/hooks"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export function UserList() {
  const { getQueryParam, setQueryParam, removeQueryParam } = useQueryParams()
  const offset = parseInt(getQueryParam("offset") ?? "0")
  const { data, error } = useQuery({
    queryKey: ["users", DEFAULT_PAGE_SIZE, offset],
    queryFn: async () => {
      return userList({ limit: DEFAULT_PAGE_SIZE, offset })
    },
  })

  if (axios.isAxiosError(error)) {
    return (
      <ErrorMessage title="Error" messages={[error.response?.data.detail]} />
    )
  }
  if (!data) {
    return <Loader />
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Is active</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data.items.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell className="text-right"></TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <Pagination className="mt-2">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                if (offset > DEFAULT_PAGE_SIZE) {
                  setQueryParam(
                    "offset",
                    JSON.stringify(offset - DEFAULT_PAGE_SIZE)
                  )
                } else if (offset === DEFAULT_PAGE_SIZE) {
                  removeQueryParam("offset")
                }
              }}
              isActive={!(offset < DEFAULT_PAGE_SIZE)}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="/users">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                setQueryParam(
                  "offset",
                  JSON.stringify(offset + DEFAULT_PAGE_SIZE)
                )
              }}
              isActive={!(data.data.count - offset <= DEFAULT_PAGE_SIZE)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
}
