import * as React from "react"
import { usePortalsContext } from "@chakra-ui/portal"

export function useStackContext(ref: React.Ref<any>, isOpen?: boolean) {
  const { modals } = usePortalsContext()

  React.useEffect(() => {
    if (!isOpen) return
    modals?.add(ref)
    return () => {
      modals?.remove(ref)
    }
    //eslint-disable-next-line
  }, [isOpen, ref])

  return modals?.value
}
