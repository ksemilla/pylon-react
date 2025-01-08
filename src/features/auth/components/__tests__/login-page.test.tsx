import { LoginPage } from "../login-page"
import { act, fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { signInWithEmailAndPassword, getAuth } from "firebase/auth"
import { googleLogin } from "@/api/auth"
import { parseJwt } from "@/lib/utils"
import * as AuthStore from "@/stores/auth"
import * as Wouter from "wouter"
import * as Toast from "@/hooks/use-toast"

vi.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: vi
    .fn()
    .mockImplementationOnce(() => ({
      user: {
        getIdToken: () => "abc123",
      },
    }))
    .mockImplementationOnce(() => {
      throw new Error("noice")
    }),
  getAuth: vi.fn(),
  GoogleAuthProvider: vi.fn(),
}))

vi.mock("@/api/auth", () => ({
  googleLogin: vi.fn().mockImplementationOnce(() => ({
    data: {
      token: "test-token",
    },
  })),
}))

vi.mock("@/lib/utils", () => ({
  parseJwt: vi.fn().mockImplementation(() => ({
    payload: {
      userId: 1,
    },
  })),
  cn: vi.fn(),
}))

vi.mock("wouter", async () => {
  const actual = await vi.importActual<typeof Wouter>("wouter")
  return {
    ...actual,
    useLocation: () => ["login", vi.fn()],
  }
})

vi.mock("@/hooks/use-toast", async () => {
  const actual = await vi.importActual<typeof Toast>("@/hooks/use-toast")
  return {
    ...actual,
    useToast: () => ({ toast: vi.fn() }),
  }
})

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

  it("submit success", async () => {
    const setItem = vi.spyOn(Storage.prototype, "setItem")
    const setUserId = vi.fn()
    const authStoreSpy = vi.spyOn(AuthStore, "useAuthStore")
    authStoreSpy.mockReturnValue({
      setUserId,
    })

    const mockSetLocation = vi.fn()
    const useLocationSpy = vi.spyOn(Wouter, "useLocation")
    useLocationSpy.mockImplementation(() => ["login", mockSetLocation])

    render(<LoginPage />)

    const emailInput = screen.getByRole("textbox", { name: /email/i })
    const passwordInput = screen.getByLabelText(/Password/i)
    const form = screen.getByRole("form", { name: "form" })
    fireEvent.change(emailInput, {
      target: { value: "test1@test.com" },
    })
    fireEvent.change(passwordInput, {
      target: { value: "testtest" },
    })
    await act(() => {
      fireEvent.submit(form)
    })

    expect(signInWithEmailAndPassword).toHaveBeenCalledOnce()
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      getAuth(),
      "test1@test.com",
      "testtest"
    )
    expect(googleLogin).toHaveBeenCalledOnce()
    expect(googleLogin).toHaveBeenCalledWith({
      accessToken: "abc123",
    })
    expect(setItem).toHaveBeenCalledOnce()
    expect(setItem).toHaveBeenCalledWith("accessToken", "test-token")
    expect(parseJwt).toHaveBeenCalledOnce()
    expect(parseJwt).toHaveBeenCalledWith("test-token")
    expect(setUserId).toHaveBeenCalledOnce()
    expect(setUserId).toHaveBeenCalledWith(1)
    expect(mockSetLocation).toHaveBeenCalledOnce()
    expect(mockSetLocation).toHaveBeenCalledWith("/")
  })

  it("submit fail - firebase auth", async () => {
    const toast = vi.fn()
    const useToastSpy = vi.spyOn(Toast, "useToast")
    useToastSpy.mockReturnValue({
      toast,
      dismiss: vi.fn(),
      toasts: [],
    })

    render(<LoginPage />)

    const emailInput = screen.getByRole("textbox", { name: /email/i })
    const passwordInput = screen.getByLabelText(/Password/i)
    const form = screen.getByRole("form", { name: "form" })
    fireEvent.change(emailInput, {
      target: { value: "test1@test.com" },
    })
    fireEvent.change(passwordInput, {
      target: { value: "testtest" },
    })
    await act(() => {
      fireEvent.submit(form)
    })

    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(2)
    expect(toast).toHaveBeenCalledOnce()
  })

  it("submit fail - api google login", async () => {
    const toast = vi.fn()
    const useToastSpy = vi.spyOn(Toast, "useToast")
    useToastSpy.mockReturnValue({
      toast,
      dismiss: vi.fn(),
      toasts: [],
    })

    render(<LoginPage />)

    const emailInput = screen.getByRole("textbox", { name: /email/i })
    const passwordInput = screen.getByLabelText(/Password/i)
    const form = screen.getByRole("form", { name: "form" })
    fireEvent.change(emailInput, {
      target: { value: "test1@test.com" },
    })
    fireEvent.change(passwordInput, {
      target: { value: "testtest" },
    })
    await act(() => {
      fireEvent.submit(form)
    })

    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(3)
    expect(googleLogin).toHaveBeenCalledOnce()
    expect(toast).toHaveBeenCalledOnce()
  })

  it("redirect to sign up page", async () => {
    render(<LoginPage />)

    const link = screen.getByText("No account yet? Create here.")
    expect(link).toBeInTheDocument()
    await act(() => {
      fireEvent.click(link)
    })

    expect(window.location.pathname).toBe("/sign-up")
  })
})
