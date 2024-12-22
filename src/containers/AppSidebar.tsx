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
import { TeamSwitcher } from "./TeamSwitcher"
import { Link } from "wouter"
import { NavSecondary } from "./NavSecondary"
import { NavUser } from "./NavUser"
import { UserRole } from "@/types/users"

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
  {
    title: "Team",
    url: "/team",
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
    url: "/entities",
    icon: Inbox,
  },
]

export function AppSidebar({ ...props }) {
  const { user } = useAuthStore()
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Applications</SidebarGroupLabel>
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
        {user?.role === UserRole.ADMIN && (
          <NavSecondary items={adminItems} className="mt-auto" />
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
