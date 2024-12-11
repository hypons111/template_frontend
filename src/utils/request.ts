import axios from "axios";

export const APIs = {
  sample: "/api/sample"
};
export interface ISample {
  checkKind: string;
  checkType: string;
}

export const request = {
  async getRequest(apiurl: string, requestData: string) {
    try {
      const { data } = await axios.get(`${apiurl}${requestData}`);
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  },

  async postRequest<T>(apiurl: string, requestData: T) {
    try {
      const { data } = await axios.post(apiurl, requestData);
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  },
};

