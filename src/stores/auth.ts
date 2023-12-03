import { User } from "@/types/users"
import { create } from "zustand"

interface AuthState {
  isLogged: boolean
  user: User | null
  setUser: (user: User) => void
  logout: () => void
  login: (user: User) => void
}

export const useAuthStore = create<AuthState>()((set) => ({
  isLogged: false,
  user: null,
  setUser: (user) => set((state) => ({ ...state, user })),

  login: (user) => set((state) => ({ ...state, user, isLogged: true })),
  logout: () => set((state) => ({ ...state, isLogged: false, user: null })),
}))
