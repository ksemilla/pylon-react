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

const queryClient = new QueryClient()

export default function App() {
  const authStore = useAuthStore()
  const token = localStorage.getItem("accessToken")

  useQuery(
    {
      queryKey: ["auth"],
      enabled: !!token,
      queryFn: async () => {
        try {
          const verifyRes = await verifyToken(token ?? "")
          authStore.setUserId(verifyRes.data.userId)
          const userRes = await getUser({ userId: verifyRes.data.userId })
          authStore.login(userRes.data)
        } catch {
          authStore.logout()
          localStorage.removeItem("accessToken")
        }
        return ""
      },
    },
    queryClient
  )

  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
      <Toaster />
    </QueryClientProvider>
  )
}
