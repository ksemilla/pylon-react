import { camelToSnakeCase, snakeToCamelCase } from "@/lib/utils"
import axios, { AxiosRequestTransformer, AxiosResponseTransformer } from "axios"

const API_URL = import.meta.env.VITE_API_URL + "/api/"

const axiosInstance = axios.create({
  baseURL: API_URL,
  transformRequest: [
    (data) => {
      return camelToSnakeCase(data)
    },
    ...(axios.defaults.transformRequest as AxiosRequestTransformer[]),
  ],
  transformResponse: [
    ...(axios.defaults.transformResponse as AxiosResponseTransformer[]),
    (data) => {
      return snakeToCamelCase(data)
    },
  ],
})

const api = {
  get: {},

  post: <R>(url: string, data: any) => {
    return axiosInstance.post<R>(url, data)
  },
}

export default api
