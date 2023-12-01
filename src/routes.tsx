import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom"
import { LoginPage } from "@/pages/login/LoginPage"
import { BaseLayout } from "@/layouts/base-layout"
import { HomePage } from "@/pages/home/HomePage"
import { Dashboard } from "./pages/dashboard/Dashboard"

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<BaseLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Route>
  )
)
