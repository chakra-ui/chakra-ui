"use client"

import { useCallbackRef, useTimeout, useUpdateEffect } from "@chakra-ui/hooks"
import { callAllHandlers } from "@chakra-ui/utils"
import { useIsPresent } from "framer-motion"
import { useCallback, useEffect, useId, useState } from "react"
import { PropGetterFn } from "../../styled-system"
import type { ToastOptions } from "./toast.types"

export function useToast(props: ToastOptions) {
  const { requestClose = false, placement, duration } = props

  const onRequestRemove = useCallbackRef(props.onRequestRemove)
  const onCloseComplete = useCallbackRef(props.onCloseComplete)

  const [delay, setDelay] = useState(duration)
  const isPresent = useIsPresent()

  const uid = useId()
  const rootId = `toast:${uid}`

  useUpdateEffect(() => {
    if (!isPresent) {
      onCloseComplete?.()
    }
  }, [isPresent])

  useUpdateEffect(() => {
    setDelay(duration)
  }, [duration])

  const onClose = useCallback(() => {
    if (isPresent) onRequestRemove?.()
  }, [isPresent, onRequestRemove])

  useEffect(() => {
    if (isPresent && requestClose) {
      onRequestRemove?.()
    }
  }, [isPresent, requestClose, onRequestRemove])

  useTimeout(onClose, delay)

  const getRootProps: PropGetterFn<"div"> = useCallback(
    (props = {}, ref = null) => {
      return {
        ...props,
        ref,
        id: rootId,
        role: "status",
        "aria-atomic": "true",
        style: {
          pointerEvents: "auto",
          maxWidth: 560,
          minWidth: 300,
          ...props.style,
        },
        onPointerEnter: callAllHandlers(props.onPointerEnter, () =>
          setDelay(null),
        ),
        onPointerLeave: callAllHandlers(props.onPointerLeave, () =>
          setDelay(duration),
        ),
      }
    },
    [duration, rootId],
  )

  const getCloseTriggerProps: PropGetterFn<"button"> = useCallback(
    (props = {}, ref = null) => {
      return {
        ...props,
        ref,
        type: "button",
        "aria-label": "Close",
        onClick: callAllHandlers(props.onClick, onClose),
      }
    },
    [onClose],
  )

  return {
    placement,
    onClose,
    getRootProps,
    getCloseTriggerProps,
  }
}

export type UseToastReturn = ReturnType<typeof useToast>
