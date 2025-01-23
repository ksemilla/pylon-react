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
  Calendar,
  Home,
  Inbox,
  LucideProps,
  Search,
  Settings,
} from "lucide-react"
import { TeamSwitcher } from "./TeamSwitcher"
import { Link } from "wouter"
import { NavSecondary } from "./NavSecondary"
import { NavUser } from "./NavUser"
import { UserRole } from "@/types/users"
import { paths } from "@/config/paths"
import {
  MemberPermission,
  MemberPermissionEnum,
} from "@/features/members/permissions"
import { useEntityStore } from "@/stores/entity"
import { hasMemberPermission } from "@/lib/utils"

const items: {
  title: string
  url: string
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >
  permission?: MemberPermission
}[] = [
  {
    title: "Home",
    url: "/",
    icon: Home,
    permission: undefined,
  },
  {
    title: "Quotations",
    url: "/quotations",
    icon: Home,
    permission: MemberPermissionEnum.QUOTATIONS_VIEW,
  },
  {
    title: "Items",
    url: "/items",
    icon: Inbox,
    permission: undefined,
  },
  {
    title: "Customers",
    url: "/customers",
    icon: Calendar,
    permission: undefined,
  },
  {
    title: "Customer Orders",
    url: "/customer-orders",
    icon: Calendar,
    permission: undefined,
  },
  {
    title: "Job Orders",
    url: "/job-orders",
    icon: Calendar,
    permission: undefined,
  },
  {
    title: "Purchase Orders",
    url: "/purchase-orders",
    icon: Search,
    permission: undefined,
  },
  {
    title: "Sales",
    url: "/sales",
    icon: Search,
    permission: undefined,
  },
  {
    title: "Invoices",
    url: "/invoices",
    icon: Search,
    permission: undefined,
  },
  {
    title: "Vendors",
    url: "/vendors",
    icon: Settings,
    permission: undefined,
  },
  {
    title: "Team",
    url: "/team",
    icon: Settings,
    permission: MemberPermissionEnum.MEMBERS_VIEW,
  },
]

const adminItems = [
  {
    title: "Users",
    url: paths.users.list.getHref(),
    icon: Home,
  },
  {
    title: "Entities",
    url: paths.entities.list.getHref(),
    icon: Inbox,
  },
]

export function AppSidebar({ ...props }) {
  const user = useAuthStore((state) => state.user)
  const entity = useEntityStore((state) => state.entity)
  const member = user?.members.find((member) => member.entity.id === entity?.id)

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Applications</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(
                (item) =>
                  hasMemberPermission(member, item.permission) && (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
              )}
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
