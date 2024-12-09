import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
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
import { NavSecondary } from "./NavSecondary"
import { Link } from "wouter"

export function BaseContainer({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="p-4 pt-0">
          <SidebarTrigger className="-ml-1" />
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Quotations",
    url: "/quotations",
    icon: Home,
  },
  {
    title: "Items",
    url: "/items",
    icon: Inbox,
  },
  {
    title: "Customers",
    url: "/customers",
    icon: Calendar,
  },
  {
    title: "Customer Orders",
    url: "/customer-orders",
    icon: Calendar,
  },
  {
    title: "Job Orders",
    url: "/job-orders",
    icon: Calendar,
  },
  {
    title: "Purchase Orders",
    url: "/purchase-orders",
    icon: Search,
  },
  {
    title: "Sales",
    url: "/sales",
    icon: Search,
  },
  {
    title: "Invoices",
    url: "/invoices",
    icon: Search,
  },
  {
    title: "Vendors",
    url: "/vendors",
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

const adminItems = [
  {
    title: "Users",
    url: "/users",
    icon: Home,
  },
  {
    title: "Entities",
    url: "#",
    icon: Inbox,
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
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <NavSecondary items={adminItems} className="mt-auto" />
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
