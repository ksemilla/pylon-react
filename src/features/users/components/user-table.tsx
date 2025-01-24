import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
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
            <TableHead className="text-right">Status</TableHead>
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
              <TableCell className="text-right">
                <Badge variant={user.isActive ? "default" : "outline"}>
                  {user.isActive ? "ACTIVE" : "INACTIVE"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-2">{pagination}</div>
    </>
  )
}
