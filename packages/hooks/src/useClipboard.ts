import * as React from "react"
import copy from "copy-to-clipboard"

export function useClipboard (text: string) {
  const [hasCopied, setHasCopied] = React.useState(false)

  const onCopy = React.useCallback(() => {
    const didCopy = copy(text)
    setHasCopied(didCopy)
  }, [text])

  React.useEffect(() => {
    if (hasCopied) {
      const id = setTimeout(() => {
        setHasCopied(false)
      }, 1500)

      return () => clearTimeout(id)
    }
  }, [hasCopied])

  return [hasCopied, onCopy] as const
}
