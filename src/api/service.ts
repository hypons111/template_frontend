/* API 封裝 */
/* 
  管理 api 請求
  對應 url 和 interface
*/

import { request } from "./axios";
import { ISample } from "./model";

export default {
  /* get request 例子 */
  getSample: async (requestData: string) => {
    return await request.getRequest("https://api.sampleapis.com/rickandmorty/characters", requestData)
  },

  /* post request 例子 */
  postSample: async (requestData: ISample) => {
    return await request.postRequest("https://api.sampleapis.com/rickandmorty/characters", requestData)
  },
};
