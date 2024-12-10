import { User } from "@/types/users"
import api from "./base"
interface LoginData {
  accessToken: string
}

interface LoginResponse {
  token: string
}

interface SignUpData {
  email: string
  password: string
}

export const login = (data: LoginData) => {
  return api.post<LoginResponse>("auth/", data)
}

export const verifyToken = (token: string) => {
  return api.post<User>("auth/verify/", { token })
}

export const signUp = (data: SignUpData) => {
  return api.post<User>("auth/sign-up/", data)
}

export const googleSignUp = (data: LoginData) => {
  return api.post<User>("auth/google-sign-up/", data)
}
