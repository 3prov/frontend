import { useCallback, useEffect, useState } from "react";

export type FetchingError = null | {
  status: number,
  message: string
}

type useFetchingResult<U> = {
  data: null | U,
  error: FetchingError,
  isLoading: boolean
}

export default function useFetching<T, U>(endpoint_query: (options: T) => Promise<Response>, params: T, dependencies: any[] = []): useFetchingResult<U> {
  const [state, setState] = useState<useFetchingResult<U>>({
    data: null,
    error: null,
    isLoading: false
  })

  useEffect(() => {
    const _res = async () => {
      setState((st) => ({...st, isLoading: true}))
      try {
        const _body = await endpoint_query(params)
        if (!_body) {
          setState((st) => ({
            ...st, 
            isLoading: false, 
            error: {
              status: -1,
              message: "UNDEF_REQ"
            }
          }))
          return
        }
        if (!_body.ok) {
          setState((st) => ({
            ...st, 
            isLoading: false, 
            error: {
              status: _body.status,
              message: _body.statusText
            }
          }))
          return
        }
        const _json: U = await _body.json()
        setState(st => ({
          ...st, 
          data: {..._json},
          isLoading: false
        }))
      } catch(e) {
        setState((st) => ({
          ...st, 
          isLoading: false, 
          error: {
            status: -1,
            message: "UNDEF_REQ"
          }
        }))
        return
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  return state
}

export function useMutation<T, U> (endpoint_mut: (o: T) => Promise<Response>) {
  const cb = useCallback(
    async (params: T, options?: {
      onError?: (err: FetchingError) => any,
      onSuccess?: (data: U) => any
    }) => {
      const _res = await endpoint_mut(params)
      if (!_res || !_res.ok) {
        options?.onError && options.onError({
          status: _res.status,
          message: _res.statusText
        })
        return
      }
      const _json: U = await _res.json()
      options?.onSuccess && options.onSuccess(_json)
    },
    [endpoint_mut]
  )
  
  return cb
}