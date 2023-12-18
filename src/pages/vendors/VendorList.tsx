import { getVendorList } from "@/api/vendors"
import Table from "@/components/data-display/Table"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

export function VendorList() {
  const navigate = useNavigate()

  const { data } = useQuery({
    queryKey: ["vendors"],
    queryFn: async () => {
      return getVendorList().then((res) => res.data)
    },
  })

  return !data ? (
    <div>Loading...</div>
  ) : (
    <div>
      <h1 className="text-base font-semibold leading-6">Vendors</h1>
      <Table
        headers={[
          { label: "Code", field: "code" },
          { label: "Name", field: "name" },
        ]}
        data={data}
        onRowClick={(obj: Record<any, any>) => {
          navigate(`${obj.id}`)
        }}
      />
    </div>
  )
}
