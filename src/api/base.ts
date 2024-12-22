import {
  camelToSnakeCase,
  camelToSnakeCaseFormData,
  snakeToCamelCase,
} from "@/lib/utils"
import axios, {
  AxiosRequestConfig,
  AxiosRequestTransformer,
  AxiosResponseTransformer,
} from "axios"

const API_URL = import.meta.env.VITE_API_URL + "/api/"

const axiosInstance = axios.create({
  baseURL: API_URL,
  transformRequest: [
    (data) => {
      if (data instanceof FormData) {
        return camelToSnakeCaseFormData(data)
      }
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

const getAccessToken = () => localStorage.getItem("accessToken")

const api = {
  get: <R>(url: string, config?: AxiosRequestConfig) => {
    return axiosInstance.get<R>(url, {
      ...config,
      headers: config?.headers ?? {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
  },

  post: <R>(url: string, data: any, config?: AxiosRequestConfig) => {
    return axiosInstance.post<R>(url, data, {
      ...config,
      headers: config?.headers ?? {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
  },
}

export default api
