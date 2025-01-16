import { act, fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { UserLayout } from "../user-layout"
import { SidebarProvider } from "@/components/ui/sidebar"

describe("UserLayout", () => {
  it("renders user layout", async () => {
    render(
      <SidebarProvider>
        <UserLayout />
      </SidebarProvider>
    )

    const sidebarTriggerBtn = screen.getByRole("button")
    expect(sidebarTriggerBtn).toBeInTheDocument()

    const usersLink = screen.getByRole("link", { name: "Users" })
    expect(usersLink).toBeInTheDocument()
    expect(usersLink).toHaveClass("text-slate-950")

    const createLink = screen.getByRole("link", { name: "Create New" })
    expect(createLink).toBeInTheDocument()
    expect(createLink).toHaveClass("text-slate-500")

    await act(() => {
      fireEvent.click(createLink)
    })
    console.log(1, window.location.pathname)
    const newUsersLink = screen.getByRole("link", { name: "Users" })
    expect(newUsersLink).toHaveClass("text-slate-500")

    const newCreateLink = await screen.findByRole("link", {
      name: "Create New",
    })
    expect(newCreateLink).toHaveClass("text-slate-950")
  })
})
