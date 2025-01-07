import { act, fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { LoginForm } from "../login-form"

vi.mock("firebase/auth")

describe("LoginForm", () => {
  it("login fails - missing email and password", async () => {
    const onSubmit = vi.fn()

    render(<LoginForm onSubmit={onSubmit} />)
    const form = screen.getByRole("form", { name: "form" })

    fireEvent.submit(form)

    const emailErrorMessage = await screen.findByText("Enter valid email")
    expect(emailErrorMessage).toBeInTheDocument()

    const passwordErrorMessage = await screen.findByText(
      "Minimum of 4 characters"
    )
    expect(passwordErrorMessage).toBeInTheDocument()

    expect(onSubmit).toHaveBeenCalledTimes(0)
  })

  it("login fails - invalid email", async () => {
    const onSubmit = vi.fn()

    render(<LoginForm onSubmit={onSubmit} />)

    const emailInput = screen.getByRole("textbox", { name: /email/i })
    const form = screen.getByRole("form", { name: "form" })

    fireEvent.change(emailInput, {
      target: { value: "test" },
    })

    await act(() => {
      fireEvent.submit(form)
    })

    const emailErrorMessage = await screen.findByText("Enter valid email")
    expect(emailErrorMessage).toBeInTheDocument()

    expect(onSubmit).toHaveBeenCalledTimes(0)
  })

  it("login fails - invalid password", async () => {
    const onSubmit = vi.fn()

    render(<LoginForm onSubmit={onSubmit} />)

    const passwordInput = screen.getByLabelText(/Password/i)
    const form = screen.getByRole("form", { name: "form" })

    fireEvent.change(passwordInput, {
      target: { value: "123" },
    })

    await act(() => {
      fireEvent.submit(form)
    })

    const emailErrorMessage = await screen.findByText("Minimum of 4 characters")
    expect(emailErrorMessage).toBeInTheDocument()

    expect(onSubmit).toHaveBeenCalledTimes(0)
  })

  it("login success", async () => {
    const onSubmit = vi.fn()

    render(<LoginForm onSubmit={onSubmit} />)

    const emailInput = screen.getByRole("textbox", { name: /email/i })
    const passwordInput = screen.getByLabelText(/Password/i)
    const form = screen.getByRole("form", { name: "form" })

    fireEvent.change(emailInput, {
      target: { value: "test@test.com" },
    })

    fireEvent.change(passwordInput, {
      target: { value: "testtest" },
    })

    await act(() => {
      fireEvent.submit(form)
    })

    const emailErrorMessage = screen.queryByText("Enter valid email")
    expect(emailErrorMessage).not.toBeInTheDocument()

    const passwordErrorMessage = screen.queryByText("Minimum of 4 characters")
    expect(passwordErrorMessage).not.toBeInTheDocument()

    expect(onSubmit).toHaveBeenCalledOnce()
  })
})
