import { LoginData } from "@/types/auth"
import { users } from "@/mock-data/users"
import { apiCall } from "./core"
import { AxiosResponse } from "axios"
import { User } from "@/types/users"

export const login = (data: LoginData): Promise<AxiosResponse<User, any>> => {
  const user = users.find((u) => u.email === data.email)
  return apiCall((resolve, reject) => {
    if (!user) {
      reject({
        response: {
          data: {
            message: "User not found",
          },
          status: 400,
        },
      })
    } else if (user.password != data.password) {
      reject({
        response: {
          data: {
            message: "Wrong credentials",
          },
          status: 400,
        },
      })
    } else {
      resolve({
        data: user,
      })
    }
  })
}
