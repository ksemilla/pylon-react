import { Spinner } from "@/components/Spinner"
import { useTheme } from "@/components/theme-prodiver"
import { useAuthStore } from "@/stores/auth"
import { Moon, Sun } from "lucide-react"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

export const BaseLayout = () => {
  const { setTheme, theme } = useTheme()
  const navigate = useNavigate()

  const isLogged = useAuthStore((state) => state.isLogged)

  useEffect(() => {
    !isLogged && navigate("/login")
  }, [isLogged, navigate])

  return !isLogged ? (
    <Spinner />
  ) : (
    <div>
      {theme === "light" ? (
        <Sun onClick={() => setTheme("dark")} />
      ) : (
        <Moon onClick={() => setTheme("light")} />
      )}
      <Outlet />
    </div>
  )
}
