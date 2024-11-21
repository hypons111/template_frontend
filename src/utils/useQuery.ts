import axios from "axios";
interface IExample {
  id?: number;
  name?: string;
  yes?: boolean;
  func?: Function;
}

const api = {
  example: async () => await axios.get<IExample[]>("/json/options.json").then(({data}) => data),
};

const createMap = <T>(data: T[], key: keyof T) => {
  const map = new Map<T[keyof T], T>();
  data.forEach((e) => {
    if (e[key] !== undefined) {
      map.set(e[key], e);
    }
  });
  return map;
};

export const examplesQuery = { queryKey: ["example"], queryFn: api.example };
export const examplesMapQuery = { ...examplesQuery, select: (data) => createMap(data, "id") };


