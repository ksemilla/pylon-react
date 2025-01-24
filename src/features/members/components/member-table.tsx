import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { Member } from "@/types/entity"

interface MemberTableProps {
  members: Member[]
  onRowClick?: (member: Member) => void
}

export function MemberTable({ members, onRowClick }: MemberTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Name</TableHead>
          {/* <TableHead className="text-right">Is active</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <TableRow
            key={member.id}
            className={cn(
              onRowClick ? "cursor-pointer" : "pointer-events-none"
            )}
            onClick={() => {
              onRowClick?.(member)
            }}
          >
            <TableCell className="font-medium">{member.id}</TableCell>
            <TableCell>{member.user.email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
