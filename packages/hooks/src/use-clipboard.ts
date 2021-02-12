import { useState, useCallback, useEffect } from "react"
import copy from "copy-to-clipboard"

/**
 * React hook to copy content to clipboard
 *
 * @param text the text or value to copy
 * @param timeout delay (in ms) to switch back to initial state once copied.
 */
export function useClipboard(
  text: string,
  timeout:
    | number
    | { timeout?: number; format?: "text/plain" | "text/html" } = 1500,
) {
  const [hasCopied, setHasCopied] = useState(false)

  const { timeout: milliseconds, ...copyOptions } =
    typeof timeout === "number" ? { timeout } : timeout

  const onCopy = useCallback(() => {
    const didCopy = copy(text, copyOptions)
    setHasCopied(didCopy)
  }, [text, copyOptions])

  useEffect(() => {
    let timeoutId: number | null = null

    if (hasCopied) {
      timeoutId = window.setTimeout(() => {
        setHasCopied(false)
      }, milliseconds)
    }

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId)
      }
    }
  }, [milliseconds, hasCopied])

  return { value: text, onCopy, hasCopied }
}
