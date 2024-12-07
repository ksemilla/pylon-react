import { User } from "@/types/users"
import { create } from "zustand"

interface AuthState {
  isLogged: boolean
  setLogged: (data: boolean) => void

  user: User | null
  login: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()((set) => ({
  isLogged: false,
  user: null,

  setLogged: (data) => set((state) => ({ ...state, isLogged: data })),

  login: (user) => set((state) => ({ ...state, isLogged: true, user })),
  logout: () => set((state) => ({ ...state, isLogged: false, user: null })),
}))
