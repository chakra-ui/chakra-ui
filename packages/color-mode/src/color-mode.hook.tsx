import { useEventListener, useSafeLayoutEffect } from "@chakra-ui/hooks"
import { useEffect } from "react"
import {
  storage,
  storageKey,
  syncBodyClassName,
  ColorMode,
} from "./color-mode.utils"

export function useUpdateBodyClassName(value: boolean) {
  useEffect(() => {
    storage.set(value ? "dark" : "light")
    syncBodyClassName(value)
  }, [value])

  useSafeLayoutEffect(() => {
    const mode = storage.get()
    syncBodyClassName(mode ? mode === "dark" : value)
  }, [])
}

export function useSyncBetweenTabs(fn: (mode: ColorMode) => void) {
  const handler = (event: StorageEvent) => {
    if (!event.newValue || event.key !== storageKey) return
    fn(event.newValue as ColorMode)
  }
  useEventListener("storage", handler)
}

// export function useLocalStorage(key: string, initialValue = "") {
//   const [value, setValue] = useState(
//     () => window.localStorage.getItem(key) || initialValue,
//   )

//   const setItem = (newValue: string) => {
//     setValue(newValue)
//     window.localStorage.setItem(key, newValue)
//   }

//   useEffect(() => {
//     const newValue = window.localStorage.getItem(key)
//     if (value !== newValue) {
//       setValue(newValue || initialValue)
//     }
//   }, [initialValue, key, value])

//   const handleStorage = useCallback(
//     (event: StorageEvent) => {
//       if (event.key === key && event.newValue !== value) {
//         setValue(event.newValue || initialValue)
//       }
//     },
//     [initialValue, key, value],
//   )

//   useEventListener("storage", handleStorage)

//   return [value, setItem] as const
// }
