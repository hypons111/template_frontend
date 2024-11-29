import axios from "axios";
interface IExample {
  id?: number;
  name?: string;
  value?: Function;
}

const api = {
  arrayData: async () => await axios.get<IExample[]>("/json/array.json").then(({data}) => data),
  objectData: async () => await axios.get<IExample[]>("/json/object.json").then(({data}) => data),
  objectArrayData: async () => await axios.get<IExample[]>("/json/objectArray.json").then(({data}) => data),
};

const parser = <T>(data: T[], key: keyof T) => {
  const map = new Map<T[keyof T], T>();
  data.forEach((e) => {
    if (e[key] !== undefined) {
      map.set(e[key], e);
    }
  });
  return map;
};

export const arrayData = { queryKey: ["arrayData"], queryFn: api.arrayData };
export const objectData = { queryKey: ["objectData"], queryFn: api.objectData };
export const objectArrayData = { queryKey: ["objectArrayData"], queryFn: api.objectArrayData };
// export const examplesMapQuery = { ...examplesObjArr, select: (data) => parser(data, "id") };


