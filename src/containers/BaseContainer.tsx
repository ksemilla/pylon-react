import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { AppSidebar } from "./AppSidebar"

export function BaseContainer({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="p-4 pt-2">
          {/* <SidebarTrigger className="-ml-1" /> */}
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
