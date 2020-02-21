import * as React from "react"

export function useRapidKeydown() {
  const [keys, setKeys] = React.useState<string[]>([])
  const keysTimeoutRef = React.useRef<any>()

  const clearKeysAfterDelay = () => {
    if (keysTimeoutRef.current) {
      clearTimeout(keysTimeoutRef.current)
      keysTimeoutRef.current = null
    }
    keysTimeoutRef.current = setTimeout(() => {
      setKeys([])
      keysTimeoutRef.current = null
    }, 300)
  }

  const onKeyDown = (callback: (str: string) => void) => (
    event: React.KeyboardEvent,
  ) => {
    const keyCode = event.keyCode || event.which
    const isBackspace = keyCode === 8

    if (isBackspace) {
      const keysCopy = [...keys]
      keysCopy.pop()
      setKeys(keysCopy)
      return
    }

    const isLetter = keyCode >= 65 && keyCode <= 90
    const isNumber = keyCode >= 48 && keyCode <= 57
    const isValid = isLetter || isNumber

    if (isValid) {
      const keysCopy = keys.concat(event.key)
      callback(keysCopy.join(""))
      setKeys(keysCopy)
      clearKeysAfterDelay()
    }
  }

  return [onKeyDown, keys.join("")] as const
}

export default useRapidKeydown
