import { PrivateAPI } from "api"

export const getInventory = () => {
	const url = `api/inventory/`
	return PrivateAPI.get(url)
}