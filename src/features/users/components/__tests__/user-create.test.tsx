import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { it, vi, Mock, expect } from "vitest"
import { describe } from "vitest"
import { UserCreatePage } from "../user-create"
import { useCreateUser } from "../../api/create-user"

vi.mock("@tanstack/react-query")

vi.mock("../../api/create-user", () => ({
  useCreateUser: vi.fn(),
}))

vi.mock("@/hooks/use-toast", () => ({
  useToast: vi.fn(),
}))

describe("UserCreate", () => {
  it("renders user create page", async () => {
    const mutateMock = vi.fn()
    ;(useCreateUser as Mock).mockReturnValue({ mutate: mutateMock })
    render(<UserCreatePage />)

    expect(screen.getByRole("form")).toBeInTheDocument()
  })

  it("success submit", async () => {
    const mutateMock = vi.fn()
    ;(useCreateUser as Mock).mockReturnValue({ mutate: mutateMock })
    render(<UserCreatePage />)

    const form = screen.getByRole("form")
    const emailInput = screen.getByRole("textbox", { name: "Email" })
    fireEvent.change(emailInput, { target: { value: "test@test.com" } })

    await waitFor(() => {
      fireEvent.submit(form)
    })

    expect(mutateMock).toHaveBeenCalledOnce()
  })

  // it("fails submit - email already in use", async () => {
  //   const mockError = {
  //     isAxiosError: true,
  //     response: { data: { detail: "Error details here" } },
  //   }

  //   // Mock the toast function
  //   const mockToast = vi.fn()
  //   vi.mocked(useToast, { partial: true }).mockReturnValue({ toast: mockToast })

  //   // // Mock the useCreateUser hook
  //   vi.mocked(useCreateUser, { partial: true }).mockReturnValue({
  //     mutate: vi.fn().mockImplementation(() => {
  //       // throw mockError // Simulate the mutation throwing an error
  //       Promise.reject(mockError)
  //     }),
  //   })

  //   render(<UserCreatePage />)

  //   const form = screen.getByRole("form")
  //   const emailInput = screen.getByRole("textbox", { name: "Email" })
  //   fireEvent.change(emailInput, { target: { value: "test@test.com" } })

  //   await waitFor(() => {
  //     fireEvent.submit(form)
  //   })

  //   // expect(mutateMock).toHaveBeenCalledOnce()
  //   // expect(toast).toHaveBeenCalledOnce()
  //   // screen.debug()
  // })
})
