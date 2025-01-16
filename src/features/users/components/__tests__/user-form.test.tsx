import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { UserForm } from "../user-form"

describe("UserForm", () => {
  it("render user form", async () => {
    const onSubmitSpy = vi.fn()
    render(<UserForm onSubmit={onSubmitSpy} />)

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
  })
})
