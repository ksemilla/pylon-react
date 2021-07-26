import axios from "axios"

import { API_URL } from "config"

export const verify = (token: string) => {

	const url = `${API_URL}/api/token/verify/`
	return axios.post(url, { token })
}