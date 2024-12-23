/* 
  管理 api 對應的 url 和 request data 的型別
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

  getMenuXXXXXXX: async (requestData: string = "") => {
    return await request.getRequest("/json/menu.json", requestData)
  },

  getPermittedMenu: async (requestData: string = "") => {
    return await request.getRequest("/json/permittedMenu.json", requestData)
  },

  getMenu: async (requestData: string = "") => {
    try {
      const [jsonMenu, permittedMenu] = await Promise.all([
        request.getRequest("/json/menu.json", requestData),
        request.getRequest("/json/permittedMenu.json", requestData),
      ]);
      return { jsonMenu, permittedMenu }
    } catch (error) {
      console.error('請求失敗:', error.message);
    }
  }
};
