import { useState, useCallback, useEffect } from "react"
import copy from "copy-to-clipboard"

/**
 * React hook to copy content to clipboard
 *
 * @param text the text or value to copy
 * @param timeout delay (in ms) to switch back to initial state once copied.
 */
export function useClipboard(text: string, timeout = 1500) {
  const [hasCopied, setHasCopied] = useState(false)

  const onCopy = useCallback(() => {
    const didCopy = copy(text)
    setHasCopied(didCopy)
  }, [text])

  useEffect(() => {
    let timeoutId: number | null = null

    if (hasCopied) {
      timeoutId = window.setTimeout(() => {
        setHasCopied(false)
      }, timeout)
    }

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId)
      }
    }
  }, [timeout, hasCopied])

  return { value: text, onCopy, hasCopied }
}
