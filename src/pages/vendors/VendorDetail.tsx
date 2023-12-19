import { getVendor } from "@/api/vendors"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

export function VendorDetail() {
  const { id } = useParams<{ id: string }>()

  const { data } = useQuery({
    queryKey: ["vendors", id],
    queryFn: async () => {
      return getVendor(parseInt(id ?? "0")).then((res) => res.data)
    },
    enabled: !!id,
  })

  return !data ? (
    <div>Loading...</div>
  ) : (
    <div>
      <h1 className="font-bold text-xl">Vendor</h1>
      {data.id}
    </div>
  )
}
