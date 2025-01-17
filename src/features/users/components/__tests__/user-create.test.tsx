import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { it, vi, Mock, expect } from "vitest"
import { describe } from "vitest"
import { UserCreatePage } from "../user-create"
import { useCreateUser } from "../../api/create-user"

vi.mock("@tanstack/react-query")

vi.mock("../../api/create-user", () => ({
  useCreateUser: vi.fn().mockImplementation(() => ({
    mutate: vi.fn(),
  })),
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
})
