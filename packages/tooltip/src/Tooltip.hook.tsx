import {
  useDisclosure,
  useEventListener,
  useId,
  useMergeRefs,
} from "@chakra-ui/hooks"
import { Placement, usePopper, UsePopperProps } from "@chakra-ui/popper"
import { callAllHandlers, mergeRefs, Dict } from "@chakra-ui/utils"
import flushable from "flushable"
import React, { useRef, useCallback, useEffect } from "react"

let pendingHide: flushable.FlushableOperation

function show(fn: (isHidePending: boolean) => void, delay: number) {
  const isHidePending = pendingHide?.pending()

  if (isHidePending) {
    pendingHide.flush()
  }

  const pendingShow = flushable(
    () => fn(isHidePending),
    isHidePending ? 0 : delay,
  )
  return pendingShow.cancel
}

function hide(fn: (flushed: boolean) => void, delay: number) {
  pendingHide = flushable(flushed => fn(flushed), delay)
  return pendingHide.cancel
}

export interface UseTooltipProps {
  /**
   * Delay (in ms) before hiding the tooltip
   * @default 200ms
   *
   * Note: This value will not be respected when switching quickly
   * between two tooltip triggers. We manage that internally and
   * ensure the other tooltip shows immediately.
   */
  hideDelay?: number
  /**
   * Delay (in ms) before showing the tooltip
   * @default 200ms
   *
   * Note: This value will not be respected when switching quickly
   * between two tooltip triggers. We manage that internally and
   * ensure the other tooltip shows immediately.
   */
  showDelay?: number
  /**
   * If `true`, the tooltip will hide on click
   */
  hideOnClick?: boolean
  /**
   * If `true`, the tooltip will hide while the mouse
   * is down
   */
  hideOnMouseDown?: boolean
  /**
   * Callback to run when the tooltip shows
   */
  onShow?(): void
  /**
   * Callback to run when the tooltip hides
   */
  onHide?(): void
  /**
   * The Popper.js placement of the tooltip
   */
  placement?: Placement
  /**
   * Custom `id` to use in place of `uuid`
   */
  id?: string
  /**
   * If `true`, the tooltip will be shown (in controlled mode)
   */
  isOpen?: boolean
  /**
   * If `true`, the tooltip will be initially shown
   */
  defaultIsOpen?: boolean
  /**
   * The size of the arrow in css units (numeric)
   * @default 10 ( = 10px )
   */
  arrowSize?: UsePopperProps["arrowSize"]
}

export function useTooltip(props: UseTooltipProps = {}) {
  const {
    showDelay = 200,
    hideDelay = 200,
    hideOnClick = true,
    onShow,
    onHide,
    hideOnMouseDown,
    placement,
    id,
    isOpen: isOpenProp,
    defaultIsOpen,
    arrowSize = 10,
  } = props

  const { isOpen, onOpen: open, onClose: close } = useDisclosure({
    isOpen: isOpenProp,
    defaultIsOpen,
    onOpen: onShow,
    onClose: onHide,
  })

  const popper = usePopper({
    forceUpdate: isOpen,
    placement,
    arrowSize,
  })

  const ref = useRef<any>(null)

  const triggerRef = useMergeRefs(ref, popper.reference.ref)

  const cancelPendingSetStateRef = useRef(() => {})

  useEffect(() => {
    return () => cancelPendingSetStateRef.current()
  }, [])

  const onScroll = useCallback(() => {
    if (isOpen) {
      cancelPendingSetStateRef.current()
      close()
    }
  }, [isOpen, close])

  useEventListener("scroll", onScroll, document, {
    capture: true,
    passive: true,
  })

  const hideImmediately = useCallback(() => {
    cancelPendingSetStateRef.current()
    close()
  }, [close])

  const onClick = useCallback(() => {
    if (hideOnClick) {
      hideImmediately()
    }
  }, [hideOnClick, hideImmediately])

  const onMouseDown = useCallback(() => {
    if (hideOnMouseDown) {
      hideImmediately()
    }
  }, [hideOnMouseDown, hideImmediately])

  const showTooltip = useCallback(() => {
    cancelPendingSetStateRef.current()

    if (!isOpen) {
      cancelPendingSetStateRef.current = show(() => {
        open()
      }, showDelay)
    }
  }, [isOpen, showDelay, open])

  const hideTooltip = useCallback(() => {
    cancelPendingSetStateRef.current()

    if (isOpen) {
      cancelPendingSetStateRef.current = hide(() => {
        close()
      }, hideDelay)
    }
  }, [isOpen, hideDelay, close])

  const onMouseOver = useCallback(
    (event: React.MouseEvent) => {
      const isSelf = event.target === (ref.current as HTMLElement)

      if (isOpen && isSelf) {
        return
      }

      showTooltip()
    },
    [isOpen, showTooltip],
  )

  const tooltipId = useId(id, "tooltip")

  // A11y: Close the tooltip if user presses escape
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (isOpen && event.key === "Escape") {
        hideImmediately()
      }
    },
    [isOpen, hideImmediately],
  )

  useEventListener("keydown", onKeyDown)

  return {
    isOpen,
    show: open,
    hide: close,
    placement: popper.placement,
    getTriggerProps: (props: Dict = {}) => ({
      ...props,
      ref: mergeRefs(props.ref, triggerRef),
      onMouseOut: callAllHandlers(props.onMouseOut, hideTooltip),
      onMouseOver: callAllHandlers(props.onMouseOver, onMouseOver),
      onClick: callAllHandlers(props.onClick, onClick),
      onMouseDown: callAllHandlers(props.onMouseDown, onMouseDown),
      onFocus: callAllHandlers(props.onFocus, showTooltip),
      onBlur: callAllHandlers(props.onBlur, hideTooltip),
      "aria-describedby": isOpen ? tooltipId : undefined,
    }),
    getTooltipProps: (props: Dict = {}) => ({
      ...props,
      id: tooltipId,
      role: "tooltip",
      ref: mergeRefs(props.ref, popper.popper.ref),
      style: { ...props.style, ...popper.popper.style },
    }),
    getArrowProps: (props: Dict = {}) => ({
      ...props,
      ref: mergeRefs(props.ref, popper.arrow.ref),
      style: { ...props.style, ...popper.arrow.style },
    }),
  }
}

export type UseTooltipReturn = ReturnType<typeof useTooltip>
