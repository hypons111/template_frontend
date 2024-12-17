/* 底層封裝 */
/* 
  axios 實例化
  導出 setRequestInterceptors(), setResponseInterceptors()
  導出 getRequest(), postRequest()
*/

import axios from "axios";

const Axios = axios.create({
  baseURL: "", //import.meta.env.VITE_BASE_API,
  timeout: 1000000,
});

export function setRequestInterceptors(token:string) {
  Axios.interceptors.request.use(config => { 
      config.headers.Authorization = `Bearer ${token}`; // 如果後端設定由 HTTP Authorization Header 讀取 token 就要設定 Axios 發請求時加上 token
      return config;
    },
    error => Promise.reject(error)
  );
}

export function setResponseInterceptors() {
  // Axios.interceptors.response.use(
  //   response => Promise.resolve(response.data),
  //   error => Promise.reject(error)
  // );
}

export const request = {
  async getRequest(apiurl: string, requestData: string) {
    try {
      const { data } = await Axios.get(`${apiurl}${requestData}`);
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  },
  async postRequest<T>(apiurl: string, requestData: T) {
    try {
      const { data } = await Axios.post(apiurl, requestData);
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  },
};

