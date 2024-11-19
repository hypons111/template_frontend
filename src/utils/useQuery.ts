import axios from "axios";

// interface
export interface IExample {
  id?: number;
  name?: string;
  yes?: boolean;
  func?: Function;
}

export const api = {
  example: async () => await axios.get<IExample[]>("").then(({data}) => data),
};

export const createMap = <T>(data: T[], key: keyof T) => {
  const map = new Map<T[keyof T], T>(); 
  data.forEach((e) => {
    if (e[key] !== undefined) {
      map.set(e[key], e); 
    }
  });
  return map;
};

export const examples = { queryKey: ["example"], queryFn: api.example };
export const examplesMap = { ...examples, select: createMap };


