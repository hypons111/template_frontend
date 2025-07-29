import axiosInstance from './axiosInstance'

const axiosRequest = {
  async getRequest<T>(api:string, payload?:T) {
    try {
      const response = await axiosInstance.get(api, { params: payload });
      return { data: response.data, status: 200 };
    } catch (error:any) {
      console.log(`[${api} 錯誤] : `, error)
      throw error.response.data.detail;
    }
  },

  async postRequest<T>(api:string, payload:T) {
    try {
      const response = await axiosInstance.post(api, payload);
      return { data: response.data, status: 200 };
    } catch (error:any) {
      console.log(`[${api} 錯誤] : `, error)
      throw error.response.data.detail;
    }
  }
};

export default axiosRequest
