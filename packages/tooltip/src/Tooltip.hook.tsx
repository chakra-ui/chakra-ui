import * as React from "react"
import flushable from "flushable"
import {
  useUpdateEffect,
  useEventListener,
  useMergeRefs,
  useId,
} from "@chakra-ui/hooks"
import { usePopper, Placement } from "@chakra-ui/popper"
import { callAllHandlers, mergeRefs } from "@chakra-ui/utils"

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

export interface TooltipHookProps {
  /**
   * Delay (in ms) before hiding the tooltip
   */
  hideDelay?: number
  /**
   * Delay (in ms) before showing the tooltip
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
   * Callback to run when the tooltip opens
   */
  onShow?(): void
  /**
   * Callback to run when the tooltip closes
   */
  onHide?(): void
  /**
   * The Popper.js placement of the tooltip
   */
  placement?: Placement
}

export function useTooltip(props: TooltipHookProps = {}) {
  const {
    showDelay = 200,
    hideDelay = 200,
    hideOnClick = true,
    onShow,
    onHide,
    hideOnMouseDown,
    placement,
  } = props
  // These two states are useful for animations
  const [immediatelyHide, setImmediatelyHide] = React.useState(false)
  const [immediatelyShow, setImmediatelyShow] = React.useState(false)

  // The actual visible state of the tooltip
  const [isOpen, setIsOpen] = React.useState(false)

  const popper = usePopper({ forceUpdate: isOpen, placement })

  const ref = React.useRef<any>(null)

  const triggerRef = useMergeRefs(ref, popper.reference.ref)

  const cancelPendingRef = React.useRef(() => {})

  React.useEffect(() => {
    return () => cancelPendingRef.current()
  })

  useUpdateEffect(() => {
    const action = isOpen ? onShow : onHide
    action?.()
  }, [onShow, onHide])

  const onScroll = React.useCallback(() => {
    if (isOpen) {
      cancelPendingRef.current()
      setIsOpen(false)
      setImmediatelyHide(true)
    }
  }, [isOpen])

  useEventListener("scroll", onScroll, document, {
    capture: true,
    passive: true,
  })

  const hideImmediately = React.useCallback(() => {
    cancelPendingRef.current()
    setIsOpen(false)
    setImmediatelyHide(true)
  }, [])

  const onClick = React.useCallback(() => {
    if (hideOnClick) {
      hideImmediately()
    }
  }, [hideOnClick, hideImmediately])

  const onMouseDown = React.useCallback(() => {
    if (hideOnMouseDown) {
      hideImmediately()
    }
  }, [hideOnMouseDown, hideImmediately])

  const showTooltip = React.useCallback(() => {
    cancelPendingRef.current()

    if (!isOpen) {
      cancelPendingRef.current = show(immediatelyShow => {
        setIsOpen(true)
        setImmediatelyShow(immediatelyShow)
      }, showDelay)
    }
  }, [isOpen, showDelay])

  const hideTooltip = React.useCallback(() => {
    cancelPendingRef.current()

    if (isOpen) {
      cancelPendingRef.current = hide(immediatelyHide => {
        setIsOpen(false)
        setImmediatelyHide(immediatelyHide)
      }, hideDelay)
    }
  }, [isOpen, hideDelay])

  const onMouseOver = React.useCallback(
    (event: React.MouseEvent) => {
      const isSelf = event.target === (ref.current as HTMLElement)
      if (isOpen && isSelf) return
      showTooltip()
    },
    [isOpen, showTooltip],
  )

  const tooltipId = useId("tooltip")

  // A11y: Close the tooltip if user presses escape
  const onKeyDown = React.useCallback(
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
    setIsOpen,
    immediatelyHide,
    immediatelyShow,
    getTriggerProps: (props: any = {}) => ({
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
    getTooltipProps: (props: any = {}) => ({
      ...props,
      id: tooltipId,
      role: "tooltip",
      ref: mergeRefs(props.ref, popper.popper.ref),
      style: { ...props.style, ...popper.popper.style },
    }),
  }
}

export type TooltipHookReturn = ReturnType<typeof useTooltip>
