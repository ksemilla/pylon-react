import { Redirect, useLocation } from "wouter"
import { useAuthStore } from "@/stores/auth"
import { verifyToken } from "../api"
import { useQuery } from "@tanstack/react-query"
import { getUser } from "@/features/users/api/get-user"
import { paths } from "@/config/paths"
import { Loader } from "@/components/custom/loader"

export function AuthContainer({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation()
  const authStore = useAuthStore()
  const token = localStorage.getItem("accessToken")

  const { isFetching } = useQuery({
    queryKey: ["auth"],
    enabled: !!token,
    queryFn: async () => {
      try {
        const verifyRes = await verifyToken(token ?? "")
        authStore.setUserId(verifyRes.data.userId)
      } catch (err) {
        authStore.logout()
        localStorage.removeItem("accessToken")
        setLocation(paths.auth.login.getHref(location))
      }
      return ""
    },
  })

  useQuery({
    queryKey: ["user", authStore.userId],
    enabled: !!authStore.userId,
    queryFn: async () => {
      return getUser({ userId: authStore.userId ?? 0 }).then((res) => {
        authStore.login(res.data)
        return res.data
      })
    },
  })

  if (!token) {
    return <Redirect to={paths.auth.login.getHref(location)} />
  }

  if (isFetching) {
    return <Loader />
  }

  return <>{children}</>
}
