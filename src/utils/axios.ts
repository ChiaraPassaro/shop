//create an axios interceptor to handle calls to the API
import axios from "axios"
//sets the base URL of the API
axios.defaults.baseURL = "https://api.escuelajs.co/api/v1/"

//sets the default headers for the API
axios.defaults.headers.common["Content-Type"] = "application/json"

axios.create()
//create an axios interceptor to handle errors
axios.interceptors.response.use(
	(response) => {
		return response
	},
	(error) => {
		console.warn(error.message)

		return Promise.reject(error)
	},
)

export default axios
