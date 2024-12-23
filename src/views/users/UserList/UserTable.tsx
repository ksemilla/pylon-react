import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { User } from "@/types/users"

interface UserTableProps {
  users: User[]
  onRowClick?: (user: User) => void
  pagination?: React.ReactNode
}

export function UserTable({ users, onRowClick, pagination }: UserTableProps) {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="pointer-events-none">
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Is active</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              className={cn(
                onRowClick ? "cursor-pointer" : "pointer-events-none"
              )}
              onClick={() => {
                onRowClick?.(user)
              }}
            >
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell className="text-right"></TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="pointer-events-none">
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="mt-2">{pagination}</div>
    </>
  )
}
