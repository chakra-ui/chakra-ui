import { useState, useCallback, useEffect } from "react"
import copy from "copy-to-clipboard"

export interface UseClipboardOptions {
  /**
   * timeout delay (in ms) to switch back to initial state once copied.
   */
  timeout?: number
  /**
   * Set the desired MIME type
   */
  format?: string
}

/**
 * React hook to copy content to clipboard
 *
 * @param initialValue the text or value to copy
 * @param {Number} [optionsOrTimeout=1500] optionsOrTimeout - delay (in ms) to switch back to initial state once copied.
 * @param {Object} optionsOrTimeout
 * @param {string} optionsOrTimeout.format - set the desired MIME type
 * @param {number} optionsOrTimeout.timeout - delay (in ms) to switch back to initial state once copied.
 *
 * @see Docs https://chakra-ui.com/docs/hooks/use-clipboard
 */
export function useClipboard(
  initialValue: string,
  optionsOrTimeout: number | UseClipboardOptions = {},
) {
  const [hasCopied, setHasCopied] = useState(false)

  const [value, setValue] = useState(initialValue)

  const { timeout = 1500, ...copyOptions } =
    typeof optionsOrTimeout === "number"
      ? { timeout: optionsOrTimeout }
      : optionsOrTimeout

  const onCopy = useCallback(() => {
    const didCopy = copy(value, copyOptions)
    setHasCopied(didCopy)
  }, [value, copyOptions])

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

  return { value, setValue, onCopy, hasCopied }
}
