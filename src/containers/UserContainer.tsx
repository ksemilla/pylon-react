import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { paths } from "@/config/paths"
import { cn } from "@/lib/utils"
import { Link, useLocation } from "wouter"

interface UserContainer {
  children: React.ReactNode
}

export function UserContainer({ children }: UserContainer) {
  const [location] = useLocation()
  return (
    <div>
      <header className="flex p-2 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-3" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <nav className="flex space-x-4 items-center">
            <Link
              href={`~${paths.users.list.getHref()}`}
              className={cn(
                "transition-colors text-sm hover:text-slate-950 dark:hover:text-slate-50",
                location === "/"
                  ? "text-slate-950 dark:text-slate-50"
                  : "text-slate-500 dark:text-slate-400"
              )}
            >
              Users
            </Link>
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Link
              href={`~${paths.users.create.getHref()}`}
              className={cn(
                "transition-colors text-sm hover:text-slate-950 dark:hover:text-slate-50",
                location === "/create"
                  ? "text-slate-950 dark:text-slate-50"
                  : "text-slate-500 dark:text-slate-400"
              )}
            >
              Create New
            </Link>
          </nav>
        </div>
      </header>
      {children}
    </div>
  )
}
