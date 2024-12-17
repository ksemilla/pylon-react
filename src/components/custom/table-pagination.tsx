import { useQueryParams } from "@/hooks/use-queryparams"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination"
import { DEFAULT_PAGE_SIZE } from "@/consts"
import { useSearch } from "wouter"

interface TablePaginationProps {
  prevHref?: string
  nextHref?: string
  disabledPrev?: boolean
  disabledNext?: boolean
  count?: number
}

export function TablePagination(props: TablePaginationProps) {
  const searchString = useSearch()
  const searchParams = new URLSearchParams(searchString)
  const { getQueryParam } = useQueryParams()
  const offset = parseInt(getQueryParam("offset") ?? "0")
  if (!offset || offset <= DEFAULT_PAGE_SIZE) {
    searchParams.delete("offset")
  } else {
    searchParams.set("offset", (offset - DEFAULT_PAGE_SIZE).toString())
  }
  const prevHref = searchParams.size === 0 ? "" : `?${searchParams.toString()}`
  searchParams.set("offset", (offset + DEFAULT_PAGE_SIZE).toString())
  const nextHref = `?${searchParams.toString()}`
  return (
    <Pagination className="mt-1">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={props.prevHref ?? prevHref}
            disabled={props.disabledPrev ?? offset < DEFAULT_PAGE_SIZE}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href={props.nextHref ?? nextHref}
            disabled={
              props.disabledNext ?? !!props.count
                ? (props.count ?? 0) - offset <= DEFAULT_PAGE_SIZE
                : false
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
