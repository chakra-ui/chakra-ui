import { isPast, addDays } from "date-fns"
import { useCallback } from "react"
import { useLocalStorage } from "react-use"

function useLocalStorageExpired<Type>(
  key: string,
): [Type, (value: Type) => void, () => void] {
  type Storage = {
    value?: Type
    expiredAt?: number
  }
  const [storage, setStorage, removeStorage] = useLocalStorage<Storage>(key)
  const setStorageWithExpired = useCallback(
    (value: Type) => {
      setStorage({
        value,
        expiredAt: addDays(new Date(), 1).valueOf(),
      })
    },
    [setStorage],
  )
  if (storage?.expiredAt && !isPast(storage.expiredAt)) {
    return [storage.value, setStorageWithExpired, removeStorage]
  } else {
    return [undefined, setStorageWithExpired, removeStorage]
  }
}

export default useLocalStorageExpired
