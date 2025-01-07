import { LoginPage } from "../login-page"
import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

vi.mock("firebase/auth")

describe("LoginPage", () => {
  it("renders login page", async () => {
    render(<LoginPage />)

    screen.getByText("Welcome back!")

    const link = screen.getByText("No account yet? Create here.")
    expect(link).toHaveClass("hover:text-blue-600")

    expect(screen.getByRole("form")).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "google-login-btn" })
    ).toBeInTheDocument()
  })

  it("submit", async () => {
    // vi.mock("onSubmit")
    // const submitMockFn = vi.fn()
    // render(<LoginPage />)
    // const emailInput = screen.getByRole("textbox", { name: /email/i })
    // const passwordInput = screen.getByLabelText(/Password/i)
    // const form = screen.getByRole("form", { name: "form" })
    // fireEvent.change(emailInput, {
    //   target: { value: "test@test.com" },
    // })
    // fireEvent.change(passwordInput, {
    //   target: { value: "testtest" },
    // })
    // await act(() => {
    //   fireEvent.submit(form)
    // })
    // expect(submitMockFn).toHaveBeenCalledOnce()
  })
})
