import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { UserTable } from "../user-table"
import { mockUsers } from "@/testing/mocks/users"

describe("UserTable", () => {
  it("renders user table", async () => {
    render(<UserTable users={[]} />)

    expect(screen.getByRole("table")).toBeInTheDocument()
  })

  it("doesn't have onRowClick prop", async () => {
    render(<UserTable users={mockUsers} />)

    const rows = screen.getAllByRole("row")
    const firstRow = rows[1]

    expect(firstRow).toHaveClass("pointer-events-none")
  })

  it("doesn't have onRowClick prop", async () => {
    const fnSpy = vi.fn()
    render(<UserTable users={mockUsers} onRowClick={fnSpy} />)

    const rows = screen.getAllByRole("row")
    const firstRow = rows[1]

    expect(firstRow).toHaveClass("cursor-pointer")
    expect(firstRow).toHaveClass("hover:bg-slate-100/50")

    fireEvent.click(firstRow)

    expect(fnSpy).toHaveBeenCalledOnce()
  })
})
