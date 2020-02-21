import * as React from "react"
import flushable from "flushable"
import {
  useUpdateEffect,
  useEventListener,
  useMergeRefs,
  useId,
} from "@chakra-ui/hooks"
import { usePopper, Placement } from "@chakra-ui/popper"

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
  hideDelay?: number
  showDelay?: number
  hideOnClick?: boolean
  hideOnMouseDown?: boolean
  onShow?(): void
  onHide?(): void
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
    return () => {
      cancelPendingRef.current()
    }
  })

  useUpdateEffect(() => {
    if (isOpen) {
      onShow && onShow()
    } else {
      onHide && onHide()
    }
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

  const hideTooltipImmediately = React.useCallback(() => {
    cancelPendingRef.current()
    setIsOpen(false)
    setImmediatelyHide(true)
  }, [])

  const onClick = React.useCallback(() => {
    if (hideOnClick) {
      hideTooltipImmediately()
    }
  }, [hideOnClick, hideTooltipImmediately])

  const onMouseDown = React.useCallback(() => {
    if (hideOnMouseDown) {
      hideTooltipImmediately()
    }
  }, [hideOnMouseDown, hideTooltipImmediately])

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
      if (isOpen && event.target === (ref.current as HTMLElement)) {
        return
      }
      showTooltip()
    },
    [isOpen, showTooltip],
  )

  const tooltipId = useId("tooltip")

  // A11y: Close the tooltip if user presses escape
  const onKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      if (isOpen && event.key === "Escape") {
        hideTooltipImmediately()
      }
    },
    [isOpen, hideTooltipImmediately],
  )
  useEventListener("keydown", onKeyDown)

  return {
    isOpen,
    setIsOpen,
    immediatelyHide,
    immediatelyShow,
    trigger: {
      ref: triggerRef,
      onMouseOut: hideTooltip,
      onMouseOver,
      onClick,
      onMouseDown,
      onFocus: showTooltip,
      onBlur: hideTooltip,
      "aria-describedby": isOpen ? tooltipId : undefined,
    },
    tooltip: {
      id: tooltipId,
      role: "tooltip",
      ...popper.popper,
    },
  }
}

export type TooltipHookReturn = ReturnType<typeof useTooltip>

export default useTooltip
