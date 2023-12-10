import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom"
import { LoginPage } from "@/pages/login/LoginPage"
import { BaseLayout } from "@/layouts/base-layout"
import { HomePage } from "@/pages/home/HomePage"
import { Dashboard } from "./pages/dashboard/Dashboard"
import { PublicLayout } from "./layouts/public-layout"
import { VendorList } from "./pages/vendors/VendorList"

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route element={<BaseLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vendors" element={<VendorList />} />
      </Route>
    </Route>
  )
)
