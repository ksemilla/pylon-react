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
import { Entity } from "@/types/entity"

interface EntityTableProps {
  entities: Entity[]
  onRowClick?: (entity: Entity) => void
}

export function EntityTable({ entities, onRowClick }: EntityTableProps) {
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
        {entities.map((entity) => (
          <TableRow
            key={entity.id}
            className={cn(
              onRowClick ? "cursor-pointer" : "pointer-events-none"
            )}
            onClick={() => {
              onRowClick?.(entity)
            }}
          >
            <TableCell className="font-medium">{entity.id}</TableCell>
            <TableCell>{entity.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}