import { useAuthStore } from "@/stores/auth"
import { Redirect, useLocation } from "wouter"
import { paths } from "@/config/paths"

export function AuthContainer({ children }: { children: React.ReactNode }) {
  const [location] = useLocation()
  const authStore = useAuthStore()

  if (!authStore.isLogged)
    return <Redirect to={paths.auth.login.getHref(location)} />

  return <>{children}</>
}
