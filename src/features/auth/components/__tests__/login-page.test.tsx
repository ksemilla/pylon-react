import { LoginPage } from "../login-page"
import { render, screen } from "@testing-library/react"
import { describe, it, vi } from "vitest"

vi.mock("firebase/auth")

describe("LoginPage", () => {
  it("renders login page", () => {
    render(<LoginPage />)

    screen.getByText("Welcome back!")
  })
})
