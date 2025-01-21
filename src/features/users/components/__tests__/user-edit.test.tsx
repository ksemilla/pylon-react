import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { UserEditPage } from "../user-edit"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import * as GetUserApi from "../../api/get-user"
import { UserRole } from "@/types/users"
import axios from "axios"
import { useToast } from "@/hooks/use-toast"
import { api } from "@/lib/api-client"

vi.mock("@/lib/utils", () => ({
  log: vi.fn(),
  cn: vi.fn(),
}))

vi.mock("@/hooks/use-toast", () => ({
  useToast: vi.fn().mockReturnValue({
    toast: vi.fn(),
  }),
}))

vi.mock("@/lib/api-client", () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
  },
}))

vi.mock("wouter", () => ({
  useParams: vi.fn().mockReturnValue({
    id: "1",
  }),
}))

describe("UserEdit", () => {
  it("renders edit user page", async () => {
    vi.mocked(api.get).mockReturnValue({
      data: {
        email: "test@test.com",
        role: UserRole.ADMIN,
        isActive: false,
      },
    } as any)

    render(
      <QueryClientProvider client={new QueryClient()}>
        <UserEditPage />
      </QueryClientProvider>
    )

    const form = await screen.findByRole("form")
    expect(form).toBeInTheDocument()
    const emailInput = await screen.findByRole("textbox", { name: "Email" })
    const roleInput = await screen.findByRole("combobox", { name: "Role" })
    const isActiveInput = await screen.findByRole("switch", {
      name: "Is Active?",
    })

    expect(emailInput).toHaveValue("test@test.com")
    expect(roleInput).toHaveTextContent(UserRole.ADMIN.toUpperCase())
    expect(isActiveInput).toHaveAttribute("data-state", "unchecked")
  })

  it("success - update user", async () => {
    vi.mocked(api.get).mockReturnValue({
      data: {
        email: "test12@test.com",
        role: UserRole.ADMIN,
        isActive: false,
      },
    } as any)

    render(
      <QueryClientProvider client={new QueryClient()}>
        <UserEditPage />
      </QueryClientProvider>
    )

    const form = await screen.findByRole("form")

    await waitFor(() => {
      fireEvent.submit(form)
    })

    expect(api.get).toHaveBeenCalled()
    expect(api.put).toHaveBeenCalledOnce()
  })

  it("fails to fetch user", async () => {
    const useUserSpy = vi.spyOn(GetUserApi, "useUser")
    useUserSpy.mockReturnValueOnce({
      error: { response: { data: { detail: "User not found" } } },
    } as any)

    const isAxiosErrorSpy = vi.spyOn(axios, "isAxiosError")
    isAxiosErrorSpy.mockImplementationOnce(() => true)

    render(
      <QueryClientProvider client={new QueryClient()}>
        <UserEditPage />
      </QueryClientProvider>
    )

    const errorTag = await screen.findByText("Error")
    expect(errorTag).toBeInTheDocument()
  })

  it("renders loader", async () => {
    const useUserSpy = vi.spyOn(GetUserApi, "useUser")
    useUserSpy.mockReturnValueOnce({
      error: { response: { data: { detail: "User not found" } } },
    } as any)

    render(
      <QueryClientProvider client={new QueryClient()}>
        <UserEditPage />
      </QueryClientProvider>
    )
    const svgElement = await screen.findByRole("img")
    expect(svgElement).toBeInTheDocument()
  })

  it("fails to update user", async () => {
    const toastSpy = vi.fn()
    vi.mocked(useToast).mockReturnValue({
      toast: toastSpy,
    } as any)

    vi.mocked(api.get).mockReturnValue({
      data: {
        email: "updateme@test.com",
        role: UserRole.ADMIN,
        isActive: false,
      },
    } as any)

    vi.mocked(api.put).mockRejectedValue({
      data: {
        email: "updateme@test.com",
        role: UserRole.ADMIN,
        isActive: false,
      },
    } as any)

    render(
      <QueryClientProvider client={new QueryClient()}>
        <UserEditPage />
      </QueryClientProvider>
    )

    const form = await screen.findByRole("form")

    await waitFor(() => {
      fireEvent.submit(form)
    })

    expect(toastSpy).toHaveBeenCalledOnce()
  })
})
