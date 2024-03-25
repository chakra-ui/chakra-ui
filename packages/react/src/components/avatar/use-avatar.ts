import { useSafeLayoutEffect } from "@chakra-ui/hooks"
import { isHTMLElement } from "@chakra-ui/utils"
import { getWindow } from "@zag-js/dom-utils"
import { useEffect, useRef, useState } from "react"

export function useAvatar() {
  const [status, setStatus] = useState<"loading" | "error" | "loaded">(
    "loading",
  )

  const imageRef = useRef<HTMLImageElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  useSafeLayoutEffect(() => {
    const node = imageRef.current
    if (node?.complete) {
      setStatus(node.currentSrc ? "loaded" : "error")
    }
  }, [])

  useEffect(() => {
    const node = imageRef.current
    if (!node) return
    // observe the image for changes
    const win = getWindow(node)

    const observer = new win.MutationObserver((entries) => {
      for (const entry of entries) {
        if (entry.attributeName === "src") {
          setStatus("loading")
        }
      }
    })

    observer.observe(node, {
      attributes: true,
      attributeFilter: ["src", "srcset"],
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const node = rootRef.current
    if (!node) return

    const win = getWindow(node)

    const observer = new win.MutationObserver((entries) => {
      for (const entry of entries) {
        const removed = Array.from(entry.removedNodes).find((node) => {
          return isHTMLElement(node) && node === imageRef.current
        })

        if (removed) {
          setStatus("error")
        }
      }
    })

    observer.observe(node, {
      childList: true,
    })

    return () => observer.disconnect()
  }, [])

  return {
    isLoaded: status === "loaded",
    rootRef,
    imageRef,
    status,
    setLoaded() {
      setStatus("loaded")
    },
    setError() {
      setStatus("error")
    },
  }
}

export type UseAvatarReturn = ReturnType<typeof useAvatar>
