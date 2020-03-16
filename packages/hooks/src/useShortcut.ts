import * as React from "react"

function isPrintableCharacter(event: React.KeyboardEvent) {
  const { key } = event
  return key.length == 1 || (key.length > 1 && /[^a-zA-Z0-9]/.test(key))
}

interface ShortcutHookProps {
  timeout?: number
  preventDefault?: (event: React.KeyboardEvent) => boolean
}

export function useShortcut(props: ShortcutHookProps = {}) {
  const { timeout = 300, preventDefault = () => true } = props

  const [keys, setKeys] = React.useState<string[]>([])
  const timeoutId = React.useRef<any>()

  const flush = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current)
      timeoutId.current = null
    }
  }

  const clearKeysAfterDelay = () => {
    flush()
    timeoutId.current = setTimeout(() => {
      setKeys([])
      timeoutId.current = null
    }, timeout)
  }

  React.useEffect(() => {
    return () => {
      flush()
    }
  }, [])

  type Callback = (keysSoFar: string) => void

  function onKeyDown(callback: Callback) {
    return (event: React.KeyboardEvent) => {
      if (event.key === "Backspace") {
        const keysCopy = [...keys]
        keysCopy.pop()
        setKeys(keysCopy)
        return
      }

      if (isPrintableCharacter(event)) {
        const keysCopy = keys.concat(event.key)

        if (preventDefault(event)) {
          event.preventDefault()
          event.stopPropagation()
        }

        setKeys(keysCopy)
        callback(keysCopy.join(""))

        clearKeysAfterDelay()
      }
    }
  }

  return onKeyDown
}

export default useShortcut
