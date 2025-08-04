import axiosRequest from "./axiosRequest";

const api = {
  getDragonballData: async () => await axiosRequest.getRequest<any[]>("https://dragonball-api.com/api/characters").then(({data}) => data)
};

export const getDragonballData = { queryKey: ["dragonball"], queryFn: api.getDragonballData, select: (data:any) => data.items};
export const getDragonballIds = { ...getDragonballData, select: (data:any) => data.items.map(({id}:any) => id) };
export const getDragonballNames = { ...getDragonballData, select: (data:any) => data.items.map(({name}:any) => name) };
