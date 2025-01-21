import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"
import { UserEditPage } from "../user-edit"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useUser } from "../../api/get-user"
import { UserRole } from "@/types/users"
import { useEditUser } from "../../api/edit-user"
import axios from "axios"

const queryClient = new QueryClient()

vi.mock("../../api/get-user", () => ({
  useUser: vi.fn(),
  getUserQueryOptions: vi.fn(),
}))

vi.mock("../../api/edit-user", () => ({
  useEditUser: vi.fn(),
}))

describe("UserEdit", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("renders edit user page", async () => {
    vi.mocked(useUser).mockReturnValueOnce({
      data: {
        data: {
          email: "test@test.com",
          role: UserRole.ADMIN,
          isActive: false,
        },
      },
    } as any)

    vi.mocked(useEditUser).mockReturnValueOnce({
      mutate: vi.fn(),
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

  it("success - update user", async () => {
    vi.mocked(useUser).mockReturnValueOnce({
      data: {
        data: {
          email: "test@test.com",
          role: UserRole.ADMIN,
          isActive: false,
        },
      },
    } as any)

    const mutateSpy = vi.fn()
    vi.mocked(useEditUser).mockReturnValueOnce({
      mutate: mutateSpy,
    } as any)

    render(
      <QueryClientProvider client={queryClient}>
        <UserEditPage />
      </QueryClientProvider>
    )

    const form = await screen.findByRole("form")

    await waitFor(() => {
      fireEvent.submit(form)
    })

    expect(mutateSpy).toHaveBeenCalledOnce()
  })

  it("fails to fetch user", async () => {
    vi.mocked(useUser).mockReturnValueOnce({
      data: {
        data: {
          email: "test@test.com",
          role: UserRole.ADMIN,
          isActive: false,
        },
      },
      error: {
        response: {
          data: {
            detail: "User not found",
          },
        },
      },
    } as any)

    vi.mocked(useEditUser).mockReturnValueOnce({
      mutate: vi.fn(),
      isPending: false,
    } as any)

    const isAxiosErrorSpy = vi.spyOn(axios, "isAxiosError")
    isAxiosErrorSpy.mockImplementationOnce(() => true)

    render(
      <QueryClientProvider client={queryClient}>
        <UserEditPage />
      </QueryClientProvider>
    )

    const errorTag = await screen.findByText("Error")
    expect(errorTag).toBeInTheDocument()
  })

  it("renders loader", async () => {
    vi.mocked(useUser).mockReturnValueOnce({
      data: false,
      error: {
        response: {
          data: {
            detail: "User not found",
          },
        },
      },
    } as any)

    vi.mocked(useEditUser).mockReturnValueOnce({
      mutate: vi.fn(),
      isPending: false,
    } as any)

    render(
      <QueryClientProvider client={queryClient}>
        <UserEditPage />
      </QueryClientProvider>
    )

    const svgElement = await screen.findByRole("img")
    expect(svgElement).toBeInTheDocument()
  })
})
