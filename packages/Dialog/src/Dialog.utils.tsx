import * as React from "react"
import { usePortalsContext } from "@chakra-ui/portal"

interface OutsideClickOptions {
  ref: React.RefObject<HTMLElement>
  overlayRef: React.RefObject<HTMLElement>
  dialogs: React.RefObject<HTMLElement>[]
  callback: (event: MouseEvent) => void
  enabled: boolean
}

export function useOutsideClick({
  ref,
  overlayRef,
  dialogs,
  callback,
  enabled,
}: OutsideClickOptions) {
  React.useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!ref.current || !enabled) return

      const eventTarget = event.target as HTMLElement
      const isContained = ref.current.contains(eventTarget)
      const lastDialog = dialogs[dialogs.length - 1]

      if (!isContained && lastDialog?.current === ref.current) {
        // Without this fix, the modal closes when you start dragging from
        // the content and release drag outside the modal. I think this is related to focus-lock's injected nodes
        // Here, we're checking if the outside target is the overlay. It usually either
        // the overlay or a focus-lock node
        if (eventTarget === overlayRef.current) {
          callback?.(event)
        }
      }
    }
    document.addEventListener("click", handler)
    return () => {
      document.removeEventListener("click", handler)
    }
  }, [dialogs, callback, ref, enabled, overlayRef])
}

export function useStackContext(ref: React.Ref<any>, isOpen?: boolean) {
  const { modals } = usePortalsContext()

  React.useEffect(() => {
    if (!isOpen) return
    modals.add(ref)
    return () => {
      modals.remove(ref)
    }
    //eslint-disable-next-line
  }, [isOpen, ref])

  return modals.value
}

export function getStyles(
  isCentered?: boolean,
  scrollBehavior?: "inside" | "outside",
) {
  let style: Record<string, any> = {}

  if (isCentered) {
    style = {
      ...style,
      left: "50%",
      top: "50%",
      transform: "translate3d(-50%, -50%, 0)",
    }
  } else {
    style = {
      ...style,
      left: "50%",
      transform: "translateX(-50%)",
      top: "3.75rem",
      mx: "auto",
    }
  }

  if (scrollBehavior === "inside") {
    style = {
      ...style,
      maxHeight: "calc(100vh - 7.5rem)",
      height: "100%",
      overflow: "hidden",
      top: "3.75rem",
    }
  }

  if (scrollBehavior === "outside") {
    style = {
      ...style,
      overflowY: "auto",
      overflowX: "hidden",
      marginY: "3.75rem",
      top: 0,
    }
  }

  return style
}
