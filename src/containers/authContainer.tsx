import { useLocation } from "wouter"
import { useAuthStore } from "@/stores/auth"
import { verifyToken } from "@/api/auth"
import { useEffect } from "react"

export function AuthContainer({ children }: { children: React.ReactNode }) {
  const [_, setLocation] = useLocation()
  const { isLogged, login, logout } = useAuthStore()
  const token = localStorage.getItem("accessToken")
  useEffect(() => {
    if (!isLogged && !token) {
      setLocation("/login")
    } else if (!isLogged && token) {
      verifyToken(token)
        .then((res) => {
          login(res.data)
        })
        .catch(() => {
          logout()
          localStorage.removeItem("accessToken")
          setLocation("/login")
        })
    }
  }, [isLogged])

  return <>{children}</>
}
