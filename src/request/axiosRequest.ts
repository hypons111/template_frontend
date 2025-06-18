/* 
  Request 封裝
  return 成功 / throw 失敗 的請求給上層模件
*/
import axiosInstance from './axiosInstance'

const axiosRequest = {
  async getRequest(api:string, requestData="") {
      return axiosInstance.get(`${api}${requestData}`);
  },

  async postRequest<T>(api:string, requestData:T) {
    return axiosInstance.post(api, requestData);
  }
};

export default axiosRequest
