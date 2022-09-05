import apiFabric from "@src/packages/api-creator";
import { BASE_URL, defaultHeader } from "./config";

export const createApi = apiFabric({
  config: {
    BASE_URL,
    defaultHeaders: defaultHeader
  }
})