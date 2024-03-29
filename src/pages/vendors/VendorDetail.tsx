import { getVendor } from "@/api/vendors"
import { Title } from "@/components/data-display/Title"
import { Text } from "@/components/typography/Text"
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
      <Title order={2}>{data.name}</Title>
      <Text>Vendor ID: {data.id}</Text>
    </div>
  )
}
