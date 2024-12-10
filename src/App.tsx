import "./firebase.ts"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { Routes } from "./routes"
import { Toaster } from "./components/ui/toaster.tsx"

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
      <Toaster />
    </QueryClientProvider>
  )
}
