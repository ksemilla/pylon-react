import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { UserSearch } from "../user-search"

vi.mock("@/hooks/use-queryparams", () => ({
  useQueryParams: () => ({
    getQueryParam: vi.fn().mockImplementation(() => "init"),
    setBaseQuery: vi.fn().mockImplementation(() => {}),
  }),
}))

describe("UserSearch", async () => {
  it("render user search", () => {
    render(<UserSearch />)

    expect(screen.getByRole("img")).toBeInTheDocument()

    expect(screen.getByRole("textbox")).toBeInTheDocument()
  })

  it("update query", async () => {
    render(<UserSearch />)

    expect(window.location.search).toBe("")

    const input = screen.getByRole("textbox") as HTMLInputElement
    expect(input.value).toBe("init")

    fireEvent.change(input, {
      target: { value: "test" },
    })
    expect(input.value).toBe("test")
    console.log(1, window.location.search)
    // expect(window.location.pathname).toBe("/?q=test")
  })
})
