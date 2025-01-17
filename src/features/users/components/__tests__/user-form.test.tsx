import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { UserForm } from "../user-form"
import { UserRole } from "@/types/users"

describe("UserForm", () => {
  it("render user form", async () => {
    const onSubmitSpy = vi.fn()
    render(<UserForm onSubmit={onSubmitSpy} />)

    const form = screen.getByRole("form")
    expect(form).toBeInTheDocument()

    const emailInput = screen.getByRole("textbox", { name: "Email" })
    expect(emailInput).toBeInTheDocument()

    const roleInput = screen.getByRole("combobox", { name: "Role" })
    expect(roleInput).toBeInTheDocument()

    const isActiveInput = screen.getByRole("switch", { name: "Is Active?" })
    expect(isActiveInput).toBeInTheDocument()

    const firstNameInput = screen.getByRole("textbox", { name: "First Name" })
    expect(firstNameInput).toBeInTheDocument()

    const lastNameInput = screen.getByRole("textbox", { name: "Last Name" })
    expect(lastNameInput).toBeInTheDocument()

    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("fail submit - missing email", async () => {
    const onSubmitSpy = vi.fn()
    render(<UserForm onSubmit={onSubmitSpy} />)

    const form = screen.getByRole("form")

    fireEvent.submit(form)

    expect(onSubmitSpy).not.toHaveBeenCalled()

    const errorMessage = await screen.findByText("Input valid email")
    expect(errorMessage).toBeInTheDocument()
  })

  it("fail submit - invalid email", async () => {
    const onSubmitSpy = vi.fn()
    render(<UserForm onSubmit={onSubmitSpy} />)

    const form = screen.getByRole("form")
    const emailInput = screen.getByRole("textbox", { name: "Email" })

    fireEvent.change(emailInput, { target: { value: "asd" } })
    fireEvent.submit(form)

    expect(onSubmitSpy).not.toHaveBeenCalled()

    const errorMessage = await screen.findByText("Input valid email")
    expect(errorMessage).toBeInTheDocument()
  })

  it("changes role", async () => {
    render(<UserForm onSubmit={() => {}} />)

    const defaultRole = screen.getByText((content, element) => {
      return (
        element?.tagName === "SPAN" && content === UserRole.USER.toUpperCase()
      )
    })

    expect(defaultRole).toBeInTheDocument()

    const roleInput = screen.getByRole("combobox", { name: "Role" })

    fireEvent.change(roleInput, { target: { value: UserRole.ADMIN } })
    expect(roleInput).toHaveValue(UserRole.ADMIN)
    // NOTE TODO: CHECK THAT THE DEFAULT VALUE OF ROLE IS USER
  })

  it("changes is active field", async () => {
    render(<UserForm onSubmit={() => {}} />)

    const isActiveInput = screen.getByRole("switch", { name: "Is Active?" })
    expect(isActiveInput).toBeChecked()
    fireEvent.click(isActiveInput)
    expect(isActiveInput).not.toBeChecked()
  })

  it("success submits", async () => {
    const onSubmitSpy = vi.fn()
    render(<UserForm onSubmit={onSubmitSpy} />)

    const form = screen.getByRole("form")
    const emailInput = screen.getByRole("textbox", { name: "Email" })

    fireEvent.change(emailInput, { target: { value: "test@test.com" } })
    await waitFor(() => {
      fireEvent.submit(form)
    })

    expect(onSubmitSpy).toHaveBeenCalledOnce()
  })
})
