import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

interface UserContainer {
  children: React.ReactNode
}

export function UserContainer({ children }: UserContainer) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <p>Users</p>
      </div>
      {children}
    </div>
  )
}
