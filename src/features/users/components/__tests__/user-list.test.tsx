import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { UserListPage } from "../user-list"
import { useUsers } from "../../api/get-users"
import { mockUsers } from "@/testing/mocks/users"
import { DEFAULT_PAGE_SIZE } from "@/consts"

vi.mock("@tanstack/react-query")

vi.mock("../../api/get-users", () => ({
  useUsers: vi.fn().mockImplementation(({ offset }) => {
    return {
      data: {
        data: {
          items:
            offset === 0
              ? mockUsers.slice(0, DEFAULT_PAGE_SIZE)
              : mockUsers.slice(DEFAULT_PAGE_SIZE, 12),
          count: mockUsers.length,
        },
      },
    }
  }),
}))

describe("UserList", () => {
  it("render user list", async () => {
    render(<UserListPage />)

    expect(useUsers).toHaveBeenCalledOnce()

    expect(await screen.findByRole("table")).toBeInTheDocument()
    // const prevButton = await screen.findByRole("link")
    // expect(prevButton).toBeInTheDocument()

    // const nextButton = await screen.findByRole("link", {
    //   name: "Go to next page",
    // })
    // expect(nextButton).toBeInTheDocument()
    // expect(nextButton).toHaveClass("pointer-events-none")

    expect(await screen.findByRole("table")).toBeInTheDocument()

    expect(await screen.findByRole("navigation")).toBeInTheDocument()

    expect(await screen.getByRole("textbox")).toBeInTheDocument()

    // const rows = await screen.findAllByRole("row")
    // expect(rows.length).toBe(12)

    // await act(() => {
    //   fireEvent.click(nextButton)
    // })
  })
})
