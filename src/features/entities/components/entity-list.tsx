import { Loader } from "@/components/custom/loader"
import { TablePagination } from "@/components/custom/table-pagination"
import axios from "axios"
import { ErrorMessage } from "@/components/custom/error"
import { useQueryParams } from "@/hooks/use-queryparams"
import { Entity } from "@/types/entity"
import { useLocation } from "wouter"
import { EntitySearch } from "./entity-search"
import { EntityTable } from "./entity-table"
import { useEntities } from "../api/get-entities"

export function EntityListPage() {
  const [_, setLocation] = useLocation()
  const { getQueryParam } = useQueryParams()
  const offset = parseInt(getQueryParam("offset") ?? "0")
  const q = getQueryParam("q") ?? ""

  const { data, error } = useEntities({
    offset,
    q,
  })

  const onRowClick = (entity: Entity) => {
    setLocation(`/${entity.id}`)
  }

  if (axios.isAxiosError(error)) {
    return (
      <ErrorMessage title="Error" messages={[error.response?.data.detail]} />
    )
  }

  return (
    <div>
      <EntitySearch />
      {!data ? (
        <Loader />
      ) : (
        <>
          <EntityTable entities={data?.data.items} onRowClick={onRowClick} />
          <TablePagination count={data?.data.count} />
        </>
      )}
    </div>
  )
}
