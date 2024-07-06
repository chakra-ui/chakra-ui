"use client"

import { useLayoutEffect, useMemo } from "react"
import { useRerender } from "./use-rerender"

type TValue = string | number | boolean | null | undefined
type TStore = Record<string, TValue>

const STORE_MAP = new Map<string, TStore>()

const getStore = <T extends TStore>(key: string, initialValue: T) => {
  const storeKey = `chakra_store_key_${key}`
  let store = STORE_MAP.get(storeKey)

  if (!store) {
    const proxyHandler: ProxyHandler<any> = {
      set(target, prop, value, receiver) {
        try {
          return Reflect.set(target, prop, value, receiver)
        } finally {
          emit(store!)
          localStorage.setItem(storeKey, JSON.stringify(target))
        }
      },
    }

    try {
      const dataString = localStorage.getItem(storeKey)
      const dataObject = JSON.parse(dataString!)

      if (!dataObject) throw new Error("Store not value")

      if (typeof dataObject !== "object") throw new Error("Store not object")

      if (Array.isArray(dataObject)) throw new Error("Store is array")

      for (const key in dataObject) {
        const value = dataObject[key]

        if (typeof value === "object" && dataObject[key] !== null)
          throw new Error(`Prop ${key} is object`)

        if (typeof value === "bigint") throw new Error(`Prop ${key} is bigint`)
      }

      store = new Proxy(dataObject, proxyHandler)
    } catch (e) {
      store = new Proxy(Object.assign({}, initialValue), proxyHandler)
    }
  }

  STORE_MAP.set(storeKey, store!)
  return store! as T
}

const SUBSCRIBE_STORE = new Set<(v: object) => any>()

const emit = (key: object) => {
  SUBSCRIBE_STORE.forEach((sub) => sub(key))
}

const subscribe = (key: object, listener: Function) => {
  const subListener = (nowKey: object) => {
    if (key !== nowKey) return
    listener()
  }

  return (
    SUBSCRIBE_STORE.add(subListener),
    () => {
      SUBSCRIBE_STORE.delete(subListener)
    }
  )
}

const useSubscribe = <T extends object>(key: T): T => {
  const rerender = useRerender()
  useLayoutEffect(() => subscribe(key, rerender), [key, rerender])
  return key
}

export const useLocalStorage = <T extends TStore>(
  key: string,
  initialValue?: T,
) => {
  const store = useMemo(
    () => getStore(key, initialValue ?? ({} as TStore)),
    [key, initialValue],
  )
  return useSubscribe(store)
}
