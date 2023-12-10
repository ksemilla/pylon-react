import { useTheme } from "./theme-prodiver"
import { Moon, Sun } from "lucide-react"

export const ToggleThemeButton = () => {
  const { setTheme, theme } = useTheme()
  return (
    <div>
      {theme === "light" ? (
        <Sun onClick={() => setTheme("dark")} />
      ) : (
        <Moon onClick={() => setTheme("light")} />
      )}
    </div>
  )
}
