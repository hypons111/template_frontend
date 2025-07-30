/* 
  APIs 封裝
  每個 api 都包成一個 function 集中管理
*/
import { ElNotification } from "element-plus";
import axiosRequest from "./axiosRequest";
import { IExample } from "./interfaces";

/* get request 例子 */
export const getExample = (payload: string) => axiosRequest.getRequest("", payload)
  // .then(data => data)
  // .catch((errorMessage) => { ElNotification({ title: errorMessage, type: "error", duration: 2500 }) })
  
/* post request 例子 */
export const postExample = (payload: IExample) => axiosRequest.postRequest("", payload)
  // .then(data => data)
  // .catch((errorMessage) => { ElNotification({ title: errorMessage, type: "error", duration: 2500 }) })
  
/* promise All request 例子 */
export const promiseALlExample = (payload1="", payload2="") => {
  return Promise.all([
    axiosRequest.getRequest("/X", payload1),
    axiosRequest.getRequest("/", payload2)
  ])
  // .then(data => data)
  // .catch((errorMessage) => { ElNotification({ title: errorMessage, type: "error", duration: 2500 }) })
}

export const dragonballAPI = (payload="") => axiosRequest.getRequest("https://dragonball-api.com/api/characters", payload)
  .then((data:any) => data)
  .catch((errorMessage) => { ElNotification({ title: errorMessage, type: "error", duration: 2500 }) })

