import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { paths } from "@/config/paths"
import { cn } from "@/lib/utils"
import { Link, useLocation } from "wouter"

interface EntityLayout {
  children?: React.ReactNode
}

export function EntityLayout({ children }: EntityLayout) {
  const [location] = useLocation()
  return (
    <div>
      <header className="flex p-2 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-3" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <nav className="flex space-x-4 items-center">
            <Link
              href={paths.entities.list.path}
              className={cn(
                "transition-colors text-sm hover:text-slate-950 dark:hover:text-slate-50",
                location === "/"
                  ? "text-slate-950 dark:text-slate-50"
                  : "text-slate-500 dark:text-slate-400"
              )}
            >
              Entities
            </Link>
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Link
              href={paths.entities.create.path}
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
