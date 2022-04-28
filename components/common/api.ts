import axios, { AxiosPromise, AxiosResponse } from "axios";

// type Method = "GET" | "POST" | "DELETE" | "PATCH";

const api = axios.create({
  headers: {},
  //   baseURL: "/api/",
});

export async function API_get(url: string) {
  return await api.get(url);
}
export async function API_post(url: string, payload: any) {
  return await api.post(url, payload);
}
export async function API_delete(url: string, payload: any) {
  return await api.get(url, payload);
}
export async function API_patch(url: string, payload: any) {
  return await api.get(url, payload);
}
