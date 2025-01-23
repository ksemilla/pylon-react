import "./firebase.ts"
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query"

import { Routes } from "./routes"
import { Toaster } from "./components/ui/toaster.tsx"
import { verifyToken } from "./features/auth/api/index.ts"
import { useAuthStore } from "./stores/auth.ts"
import { getUser } from "./features/users/api/get-user.ts"
import { Loader } from "./components/custom/loader.tsx"
import { getDefaultEntityId } from "./lib/utils.ts"
import { useEntityStore } from "./stores/entity.ts"

const queryClient = new QueryClient()

export default function App() {
  const authStore = useAuthStore()
  const entityStore = useEntityStore()
  const token = localStorage.getItem("accessToken")

  const { isFetching } = useQuery(
    {
      queryKey: ["auth"],
      enabled: !!token,
      queryFn: async () => {
        try {
          const verifyRes = await verifyToken(token ?? "")
          authStore.setUserId(verifyRes.data.userId)
          const userRes = await getUser({ userId: verifyRes.data.userId })
          console.log(userRes.data)
          authStore.login(userRes.data)

          const selectedEntityId = getDefaultEntityId(userRes.data)
          if (selectedEntityId) {
            entityStore.setEntityId(selectedEntityId)
          }
        } catch (err) {
          authStore.logout()
          localStorage.removeItem("accessToken")
        }
        return ""
      },
    },
    queryClient
  )

  if (isFetching) return <Loader />

  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
      <Toaster />
    </QueryClientProvider>
  )
}
