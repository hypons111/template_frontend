import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: "",//(import.meta as any).env.VITE_BASE_API,
  headers: { 'Content-Type': 'application/json; charset=UTF-8' },
  timeout: 10000,
})

axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
)

export default axiosInstance