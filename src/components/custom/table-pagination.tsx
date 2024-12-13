import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination"

interface TablePaginationProps {
  onPrev?: () => void
  onNext?: () => void
  disabledPrev?: boolean
  disabledNext?: boolean
}

export function TablePagination(props: TablePaginationProps) {
  const { onPrev, onNext, disabledPrev, disabledNext } = props
  return (
    <Pagination className="mt-2">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={onPrev} disabled={disabledPrev} />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={onNext} disabled={disabledNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
