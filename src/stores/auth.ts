import { User } from "@/types/users"
import { create } from "zustand"

interface AuthState {
  isLogged: boolean
  setLogged: (data: boolean) => void

  userId: number | null
  user: User | null
  login: (user: User) => void
  logout: () => void
  setUserId: (id: number) => void
}

export const useAuthStore = create<AuthState>()((set) => ({
  isLogged: false,
  user: null,
  userId: null,

  setLogged: (data) => set((state) => ({ ...state, isLogged: data })),
  setUserId: (id) => set((state) => ({ ...state, isLogged: true, userId: id })),

  login: (user) => set((state) => ({ ...state, user })),
  logout: () =>
    set((state) => ({ ...state, isLogged: false, user: null, userId: null })),
}))
