import { prefix, toNothing, toVoid } from './utils'

type Id = string | undefined

interface IStorageWorker<T> {
  get(id: Id): T | null
  set(id: Id, value: T): void
}

export function createStorageWorker<T>(
  name: string,
  wGet?: (getResult: T | null) => T
): IStorageWorker<T> {
  return {
    get(id) {
      const result = JSON.parse(localStorage.getItem(prefix(name, toNothing(id))) || 'null') as T
      if (wGet) {
        return wGet(result)
      }
      return result
    },
    set(id, value) {
      localStorage.setItem(prefix(name, toVoid(id)), JSON.stringify(value))
    },
  }
}