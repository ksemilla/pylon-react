import { PrivateAPI } from "api"

export const getVendors = () => {
	const url = `api/vendors/`
	return PrivateAPI.get(url)
}