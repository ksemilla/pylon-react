import { useTheme } from "@/components/theme-prodiver"
import { Moon, Sun } from "lucide-react"
import { Outlet } from "react-router-dom"

export const BaseLayout = () => {
  const { setTheme, theme } = useTheme()
  return (
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
