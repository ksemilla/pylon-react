import api from "./base"
import { LoginData, SignUpData, TokenResponse } from "@/types/auth"

export const login = (data: LoginData) => {
  return api.post<TokenResponse>("auth/", data)
}

export const verifyToken = (token: string) => {
  return api.post<{ userId: number }>("auth/verify/", { token })
}

export const signUp = (data: SignUpData) => {
  return api.post<TokenResponse>("auth/sign-up/", data)
}

export const googleSignUp = (data: LoginData) => {
  return api.post<TokenResponse>("auth/google-sign-up/", data)
}
