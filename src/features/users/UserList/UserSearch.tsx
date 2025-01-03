import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useQueryParams } from "@/hooks/use-queryparams"
import { useDebounce } from "@/hooks/use-debounce"
import { useEffect } from "react"

export function UserSearch() {
  const { getQueryParam, setBaseQuery } = useQueryParams()
  const queryParam = getQueryParam("q") ?? ""
  const [q, setQuery] = useDebounce<string>(queryParam)

  useEffect(() => {
    setBaseQuery({
      set: [{ key: "q", value: q }],
      remove: ["offset"],
    })
  }, [q])

  return (
    <div className="flex w-full max-w-sm items-center space-x-2 mb-1">
      <Search className="opacity-50" />
      <Input
        defaultValue={queryParam}
        onChange={(e) => {
          setQuery(e.target.value)
        }}
      />
    </div>
  )
}
