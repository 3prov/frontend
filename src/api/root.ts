import { BASE_URL, defaultHeader } from "./config";

export function createApi ({
  url = '',
  params,
  method = 'GET',
  headers = {},
  data = {},
  cache = true
}: {
  url: string,
  params?: { [param: string]: string },
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  headers?: Headers | { [header: string]: string },
  data?: object,
  cache?: boolean
}) { 
  return fetch(
    `${BASE_URL}${url}${params ? '?' + new URLSearchParams(params) : ''}`, {
      method,
      headers: {
        ...defaultHeader,
        ...headers
      },
      body: method === 'GET' ? undefined : JSON.stringify(data),
      cache: cache ? 'default' : 'no-cache'
    }
  )
}