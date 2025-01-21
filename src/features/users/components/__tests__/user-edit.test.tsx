import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { UserEditPage } from "../user-edit"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useUser } from "../../api/get-user"
import { UserRole } from "@/types/users"
import { useEditUser } from "../../api/edit-user"

const queryClient = new QueryClient()

vi.mock("../../api/get-user", () => ({
  useUser: vi.fn(),
  getUserQueryOptions: vi.fn(),
}))

vi.mock("../../api/edit-user", () => ({
  useEditUser: vi.fn(),
}))

describe("UserEdit", () => {
  it("renders edit user page", async () => {
    vi.mocked(useUser).mockReturnValue({
      data: {
        data: {
          email: "test@test.com",
          role: UserRole.ADMIN,
          isActive: false,
        },
      },
    } as any)

    vi.mocked(useEditUser).mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    } as any)

    render(
      <QueryClientProvider client={queryClient}>
        <UserEditPage />
      </QueryClientProvider>
    )

    const form = await screen.findByRole("form")
    expect(form).toBeInTheDocument()
    const emailInput = screen.getByRole("textbox", { name: "Email" })
    const roleInput = screen.getByRole("combobox", { name: "Role" })
    const isActiveInput = screen.getByRole("switch", { name: "Is Active?" })

    expect(useUser).toHaveBeenCalledOnce()
    expect(emailInput).toHaveValue("test@test.com")
    expect(roleInput).toHaveTextContent(UserRole.ADMIN.toUpperCase())
    expect(isActiveInput).toHaveAttribute("data-state", "unchecked")
  })
})
