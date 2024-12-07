import { User } from "@/types/users"
import api from "./base"
interface LoginData {
  accessToken: string
}

interface LoginResponse {
  token: string
}

export const login = (data: LoginData) => {
  return api.post<LoginResponse>("auth/", data)
}

export const verifyToken = (token: string) => {
  return api.post<User>("auth/verify/", { token })
}
