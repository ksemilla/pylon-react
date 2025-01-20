import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { it, vi, expect } from "vitest"
import { describe } from "vitest"
import { UserCreatePage } from "../user-create"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import * as Toast from "@/hooks/use-toast"
import * as UCU from "../../api/create-user"

const queryClient = new QueryClient()

vi.mock("@/lib/api-client", () => ({
  api: {
    post: vi.fn().mockRejectedValue(new Error("lol")),
  },
}))

vi.mock("@/lib/utils", () => ({
  log: vi.fn(),
  cn: vi.fn(),
}))

describe("UserCreate", () => {
  it("renders user create page", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <UserCreatePage />
      </QueryClientProvider>
    )

    expect(screen.getByRole("form")).toBeInTheDocument()
  })

  // it("success submit", async () => {
  //   const mutateMock = vi.fn()
  //   const useCreateUserMock = vi.spyOn(UCU, "useCreateUser")
  //   useCreateUserMock.mockReturnValue({
  //     data: {
  //       data: { email: "", role: "user", isActive: true },
  //       status: 200,
  //       statusText: "",
  //       headers: {},
  //       // config: { headers: { set: () => {} } },
  //     },
  //     error: { message: "", name: "" },
  //     isError: false,
  //     isIdle: false,
  //     isPending: false,
  //     isPaused: false,
  //     isSuccess: false,
  //     failureCount: 0,
  //     failureReason: { message: "", name: "" },
  //     mutate: mutateMock,
  //     mutateAsync: vi.fn(),
  //     reset: vi.fn(),
  //     status: "success",
  //     submittedAt: 0,
  //     variables: { email: "", role: "user", isActive: true },
  //   })

  //   render(
  //     <QueryClientProvider client={queryClient}>
  //       <UserCreatePage />
  //     </QueryClientProvider>
  //   )

  //   const form = screen.getByRole("form")
  //   const emailInput = screen.getByRole("textbox", { name: "Email" })
  //   fireEvent.change(emailInput, { target: { value: "test@test.com" } })

  //   await waitFor(() => {
  //     fireEvent.submit(form)
  //   })

  //   expect(useCreateUserMock).toHaveBeenCalledTimes(1)
  // })

  it("fails submit - email already in use", async () => {
    const toast = vi.fn()
    const useToastSpy = vi.spyOn(Toast, "useToast")
    useToastSpy.mockReturnValue({
      toast,
      dismiss: vi.fn(),
      toasts: [],
    })

    render(
      <QueryClientProvider client={queryClient}>
        <UserCreatePage />
      </QueryClientProvider>
    )

    const form = screen.getByRole("form")
    const emailInput = screen.getByRole("textbox", { name: "Email" })
    fireEvent.change(emailInput, { target: { value: "test@test.com" } })

    await waitFor(() => {
      fireEvent.submit(form)
    })

    expect(toast).toHaveBeenCalledOnce()
  })
})
