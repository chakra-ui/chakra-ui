import * as React from "react"

/**
 * Checks if the key pressed is a printable character
 * and can be used for shortcut navigation
 *
 * @param event the keyboard event
 */
function isPrintableCharacter(event: React.KeyboardEvent) {
  const { key } = event
  return key.length == 1 || (key.length > 1 && /[^a-zA-Z0-9]/.test(key))
}

export interface ShortcutHookProps {
  timeout?: number
  preventDefault?: (event: React.KeyboardEvent) => boolean
}

type Callback = (keysSoFar: string) => void

/**
 * React hook that provides an enhanced keydown handler,
 * that's used for key navigation within menus, select dropdowns.
 *
 * @param props the shortcut options
 */
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
    return () => flush()
  }, [])

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
