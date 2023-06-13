import { useState, useCallback, useEffect } from "react"
import copy from "copy-to-clipboard"
import { warn } from "@chakra-ui/utils"

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

interface UseClipboardReturn {
  value: string
  setValue: (value: string) => void
  onCopy: (value?: string) => void
  hasCopied: boolean
}

/**
 * React hook to copy content to clipboard
 *
 * @param value the text or value to copy
 * @param {Number} [optionsOrTimeout=1500] optionsOrTimeout - delay (in ms) to switch back to initial state once copied.
 * @param {Object} optionsOrTimeout
 * @param {string} optionsOrTimeout.format - set the desired MIME type
 * @param {number} optionsOrTimeout.timeout - delay (in ms) to switch back to initial state once copied.
 *
 * @see Docs https://chakra-ui.com/docs/hooks/use-clipboard
 */
export function useClipboard(): Pick<UseClipboardReturn, "hasCopied" | "onCopy">
export function useClipboard(
  optionsOrTimeout: number | UseClipboardOptions,
): Pick<UseClipboardReturn, "hasCopied" | "onCopy">
export function useClipboard(value: string): UseClipboardReturn
export function useClipboard(
  value: string,
  optionsOrTimeout: number | UseClipboardOptions,
): UseClipboardReturn
export function useClipboard(
  ...args:
    | []
    | [string | number | UseClipboardOptions]
    | [string, number | UseClipboardOptions]
) {
  const value = typeof args[0] === "string" ? args[0] : undefined
  const optionsOrTimeout =
    typeof args[0] === "string" ? args[1] ?? {} : args[0] ?? {}

  const [hasCopied, setHasCopied] = useState(false)

  const [valueState, setValueState] = useState(value)
  useEffect(() => setValueState(value), [value])

  const { timeout = 1500, ...copyOptions } =
    typeof optionsOrTimeout === "number"
      ? { timeout: optionsOrTimeout }
      : optionsOrTimeout

  const onCopy = useCallback(
    (value?: string) => {
      if (typeof value !== "string" && typeof valueState !== "string") {
        warn({
          condition: true,
          message:
            "If `useCallback` is called without `value` argument, a `value` must be passed to as an argument to `onCopy`",
        })

        return
      }

      const didCopy = copy((value ?? valueState) as string, copyOptions)
      setHasCopied(didCopy)
    },
    [valueState, copyOptions],
  )

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

  if (typeof valueState === "string") {
    return {
      value: valueState,
      setValue: setValueState,
      onCopy,
      hasCopied,
    } as UseClipboardReturn
  }

  return {
    onCopy,
    hasCopied,
  }
}
