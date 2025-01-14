import { useLocation } from "wouter"
import { useAuthStore } from "@/stores/auth"
import { verifyToken } from "@/api/auth"
import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { getUser } from "@/api/users"
import { paths } from "@/config/paths"

export function AuthContainer({ children }: { children: React.ReactNode }) {
  // const [_, setLocation] = useLocation()
  // const { isLogged, login, logout, userId, setUserId } = useAuthStore()
  // const token = localStorage.getItem("accessToken")
  // useEffect(() => {
  //   if (!isLogged && !token) {
  //     setLocation(paths.auth.login.path)
  //   } else if (!isLogged && token) {
  //     verifyToken(token)
  //       .then((res) => {
  //         setUserId(res.data.userId)
  //       })
  //       .catch(() => {
  //         logout()
  //         localStorage.removeItem("accessToken")
  //         setLocation(paths.auth.login.path)
  //       })
  //   }
  // }, [isLogged])

  // useQuery({
  //   queryKey: ["user", userId],
  //   enabled: !!userId,
  //   queryFn: async () => {
  //     return getUser(userId ?? 0).then((res) => {
  //       login(res.data)
  //       return res.data
  //     })
  //   },
  // })
  return <>{children}</>
}
