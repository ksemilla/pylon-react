import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import { Toaster } from "./components/toast/toaster"

function App() {
  return (
    <div className="min-h-[100vh] text-[#213547] bg-white dark:text-gray-50 dark:bg-[#1a1b1e]">
      <Toaster />
      <RouterProvider router={router} />
    </div>
  )
}

export default App
