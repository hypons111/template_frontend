/* 
  建立 Axios 實例
  設定請求
*/
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
  (response) => response.data,
  (error) => {
    console.log("[錯誤]", error)
    throw error?.response?.data?.detail || error.message;
  }
)

export default axiosInstance