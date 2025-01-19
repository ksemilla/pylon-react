import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { it, vi, expect } from "vitest"
import { describe } from "vitest"
import { UserCreatePage } from "../user-create"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createUser } from "../../api/create-user"
// import * as TRQ from "@tanstack/react-query"

// vi.mock("@tanstack/react-query", async () => {
//   const actual = await vi.importActual<typeof TRQ>("@tanstack/react-query")
//   return {
//     ...actual,
//     // useMutation: () => ({
//     //   mutate: vi.fn().mockImplementation(() => {
//     //     throw new Error("lol")
//     //   }),
//     // }),
//     useQueryClient: vi.fn(),
//   }
// })

vi.mock("../../api/create-user.ts", { spy: true })

// vi.mock("../../api/create-user", async (importOriginal) => {
//   const actual: object = await importOriginal()
//   return {
//     ...actual,
//     createUser: vi.fn(),
//   }
// })

// vi.mock("@/hooks/use-toast", () => ({
//   useToast: vi.fn(),
// }))

describe("UserCreate", () => {
  // it("renders user create page", async () => {
  //   const mutateMock = vi.fn()
  //   ;(useCreateUser as Mock).mockReturnValue({ mutate: mutateMock })
  //   render(<UserCreatePage />)

  //   expect(screen.getByRole("form")).toBeInTheDocument()
  // })

  // it("success submit", async () => {
  //   const mutateMock = vi.fn()
  //   ;(useCreateUser as Mock).mockReturnValue({ mutate: mutateMock })
  //   render(<UserCreatePage />)

  //   const form = screen.getByRole("form")
  //   const emailInput = screen.getByRole("textbox", { name: "Email" })
  //   fireEvent.change(emailInput, { target: { value: "test@test.com" } })

  //   await waitFor(() => {
  //     fireEvent.submit(form)
  //   })

  //   expect(mutateMock).toHaveBeenCalledOnce()
  // })

  it("fails submit - email already in use", async () => {
    // const mockError = {
    //   isAxiosError: true,
    //   response: { data: { detail: "Error details here" } },
    // }

    // // Mock the toast function
    // const mockToast = vi.fn()
    // vi.mocked(useToast, { partial: true }).mockReturnValue({ toast: mockToast })

    // // Mock the useCreateUser hook
    // vi.mocked(useCreateUser, { partial: true }).mockReturnValue({
    //   mutate: vi.fn().mockImplementation(() => {
    //     // throw mockError // Simulate the mutation throwing an error
    //     Promise.reject(mockError)
    //   }),
    // })

    // vi.mocked(createUser).mockRejectedValue({
    //   isAxiorError: true,
    // })

    const queryClient = new QueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <UserCreatePage />
      </QueryClientProvider>
    )

    const form = screen.getByRole("form")
    const emailInput = screen.getByRole("textbox", { name: "Email" })
    fireEvent.change(emailInput, { target: { value: "test@test.com" } })

    await waitFor(() => {
      fireEvent.submit(form)
    })

    // expect(mutateMock).toHaveBeenCalledOnce()
    expect(createUser).toHaveBeenCalledOnce()
    // screen.debug()
  })
})
