import { apiCall } from "./core"
import { AxiosResponse } from "axios"
import { Vendor } from "@/types/vendors"
import { vendors } from "@/mock-data/vendors"

export const getVendorList = (params?: { page?: number, perPage?: number }): Promise<AxiosResponse<Vendor[], any>> => {

  const {page=1, perPage=10} = params ?? { page: 1, perPage: 10 }

  return apiCall((resolve, _reject) => {
    resolve({
      data: vendors.slice(page-1, perPage),
    })
  })
}
