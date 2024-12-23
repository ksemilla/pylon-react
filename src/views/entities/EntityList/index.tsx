import { entityList } from "@/api/entities"
import { useQuery } from "@tanstack/react-query"
import { EntityTable } from "./EntityTable"
import { Loader } from "@/components/custom/loader"
import { TablePagination } from "@/components/custom/table-pagination"
import { EntitySearch } from "./EntitySearch"
import axios from "axios"
import { ErrorMessage } from "@/components/custom/error"
import { useQueryParams } from "@/hooks/use-queryparams"
import { DEFAULT_PAGE_SIZE } from "@/consts"
import { Entity } from "@/types/entity"

export function EntityList() {
  const { getQueryParam } = useQueryParams()
  const offset = parseInt(getQueryParam("offset") ?? "0")
  const q = getQueryParam("q") ?? ""

  const { data, error } = useQuery({
    queryKey: ["entities", DEFAULT_PAGE_SIZE, offset, q],
    queryFn: async () => {
      return entityList()
    },
  })

  const onRowClick = (entity: Entity) => {
    console.log(entity)
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
