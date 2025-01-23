import { paths } from "@/config/paths"
import { useQueryParams } from "@/hooks/use-queryparams"
import { useAuthStore } from "@/stores/auth"
import { Redirect } from "wouter"

type PublicContainer = {
  children: React.ReactNode
}

export function PublicContainer({ children }: PublicContainer) {
  const { getQueryParam } = useQueryParams()
  const redirectTo = getQueryParam("redirectTo") ?? paths.home.path
  const authStore = useAuthStore()

  if (authStore.isLogged) return <Redirect to={redirectTo} />

  return <>{children}</>
}
