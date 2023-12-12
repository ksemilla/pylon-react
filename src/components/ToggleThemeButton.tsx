import { ActionButton } from "./buttons/ActionButton"
import { useTheme } from "./theme-prodiver"
import { Moon, Sun } from "lucide-react"

export const ToggleThemeButton = () => {
  const { setTheme, theme } = useTheme()
  return (
    <ActionButton>
      {theme === "light" ? (
        <Sun onClick={() => setTheme("dark")} />
      ) : (
        <Moon onClick={() => setTheme("light")} />
      )}
    </ActionButton>
  )
}
