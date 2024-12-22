import { entityList } from "@/api/entities"
import { useQuery } from "@tanstack/react-query"
import { EntityTable } from "./EntityTable"
import { Loader } from "@/components/custom/loader"
import { TablePagination } from "@/components/custom/table-pagination"

export function EntityList() {
  const { data } = useQuery({
    queryKey: ["entities"],
    queryFn: async () => {
      return entityList()
    },
  })

  if (!data) return <Loader />

  return (
    <div>
      <EntityTable entities={data?.data.items} />
      <TablePagination count={data.data.count} />
    </div>
  )
}
