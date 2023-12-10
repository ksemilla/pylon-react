import { useTheme } from "@/components/theme-prodiver"
import { Outlet } from "react-router-dom"
import { Moon, Sun } from "lucide-react"

export const PublicLayout = () => {
  const { theme, setTheme } = useTheme()
  return (
    <div className="relative">
      <div className="absolute top-4 right-4">
        {theme === "light" ? (
          <Sun onClick={() => setTheme("dark")} />
        ) : (
          <Moon onClick={() => setTheme("light")} />
        )}
      </div>
      <Outlet />
    </div>
  )
}
