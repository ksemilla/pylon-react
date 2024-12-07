import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useAuthStore } from "@/stores/auth"

import {
  AudioWaveform,
  Calendar,
  Command,
  GalleryVerticalEnd,
  Home,
  Inbox,
  Search,
  Settings,
} from "lucide-react"
import { NavUser } from "./NavUser"
import { TeamSwitcher } from "./TeamSwitcher"

export function BaseContainer({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}

const items = [
  {
    title: "Quotations",
    url: "#",
    icon: Home,
  },
  {
    title: "Items",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Customers",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Customer Orders",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Job Orders",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Purchase Orders",
    url: "#",
    icon: Search,
  },
  {
    title: "Sales",
    url: "#",
    icon: Search,
  },
  {
    title: "Invoices",
    url: "#",
    icon: Search,
  },
  {
    title: "Vendors",
    url: "#",
    icon: Settings,
  },
]

const teams = [
  {
    name: "Acme Inc",
    logo: GalleryVerticalEnd,
    plan: "Enterprise",
  },
  {
    name: "Acme Corp.",
    logo: AudioWaveform,
    plan: "Startup",
  },
  {
    name: "Evil Corp.",
    logo: Command,
    plan: "Free",
  },
]

function AppSidebar() {
  const { user } = useAuthStore()
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            email: user?.email ?? "",
            name: user?.email ?? "",
            avatar: user?.picture ?? "",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
