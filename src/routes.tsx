import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom"
import { LoginPage } from "./pages/login/LoginPage"
import { BaseLayout } from "@/layouts/base-layout"

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<BaseLayout />}>
      <Route path="/" element={<LoginPage />} />
    </Route>
  )
)
