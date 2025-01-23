import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { paths } from "@/config/paths"
import { useAuthStore } from "@/stores/auth"
// import { useEntityStore } from "@/stores/entity"
import { LogOut } from "lucide-react"
import { useLocation } from "wouter"

type Facade = {
  children: React.ReactNode
}

export function Facade({ children }: Facade) {
  const authStore = useAuthStore()
  // const entityStore = useEntityStore()

  if (authStore.user?.members.length === 0) {
    return <NoTeam />
  }

  return <>{children}</>
}

function NoTeam() {
  const authStore = useAuthStore()
  const [_, setLocation] = useLocation()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Not a member of any organization
      </div>
      <div className="flex space-x-2 items-center">
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage
            src={authStore.user?.picture}
            alt={authStore.user?.email}
          />
          <AvatarFallback className="rounded-lg">
            {authStore.user?.email.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <Button
          onClick={() => {
            authStore.logout()
            localStorage.removeItem("accessToken")
            setLocation(paths.auth.login.path)
          }}
        >
          <LogOut />
          Log out
        </Button>
      </div>
    </div>
  )
}
