import "./firebase.ts"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { Routes } from "./routes"
import { Toaster } from "./components/ui/toaster.tsx"
import { useEffect } from "react"
import { useAuthStore } from "./stores/auth.ts"
import { verifyToken } from "@/features/auth/api"

const queryClient = new QueryClient()

export default function App() {
  const { isLogged, logout, setUserId } = useAuthStore()
  const token = localStorage.getItem("accessToken")
  useEffect(() => {
    if (token) {
      verifyToken(token)
        .then((res) => {
          setUserId(res.data.userId)
        })
        .catch(() => {
          logout()
          localStorage.removeItem("accessToken")
        })
    }
  }, [isLogged])
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
      <Toaster />
    </QueryClientProvider>
  )
}
