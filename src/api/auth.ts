import { LoginData } from "@/types/auth"
import { users } from "@/mock-data/users"
import { apiCall } from "./core"

export const login = (data: LoginData) => {
  const user = users.find((u) => u.email === data.email)
  return apiCall(user, "lol")
  // return new Promise((resolve, reject) => {
  //   if (user) {
  //     resolve({ data: user })
  //   } else {
  //     reject("lol")
  //   }
  // })
}
