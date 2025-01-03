/* 
  管理 api 對應的 url 和 request data 的型別
*/

import { request } from "./axios";
import { IExample } from "./model";

export default {
  /* get request 例子 */
  getExample: async (requestData: string) => {
    return await request.getRequest("", requestData)
  },

  /* post request 例子 */
  postExample: async (requestData: IExample) => {
    return await request.postRequest("", requestData)
  },

  getMenu: async (requestData: string) => {
    try {
      const [jsonMenu, permittedMenu] = await Promise.all([
        request.getRequest("/json/menu.json", requestData),
        request.getRequest("/json/permittedMenu.json", requestData),
      ]);
      return { jsonMenu, permittedMenu }
    } catch (error) {
      console.error('請求失敗:', error.message);
    }
  },

  getPermittedMenu: async (requestData: string) => {
    return await request.getRequest("/json/permittedMenu.json", requestData)
  },

  getCountries: async (requestData: string) => {
    return await request.getRequest("/json/countries.json", requestData)
  },

};
