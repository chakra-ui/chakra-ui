import { useDisclosure, useEventListener, useId } from "@chakra-ui/hooks"
import { Placement, usePopper, UsePopperProps } from "@chakra-ui/popper"
import { callAllHandlers, mergeRefs, Dict } from "@chakra-ui/utils"
import flushable from "flushable"
import * as React from "react"

let hideOperation: flushable.FlushableOperation
let activeId: string | null = null

function show(fn: (isHidePending: boolean) => void, delay: number) {
  // check if hide has not been executed
  const isHidePending = hideOperation?.pending()

  // immediately execute hide if it has not been executed
  if (isHidePending) {
    hideOperation.flush()
  }

  // setup the show operation using flushable
  const showOperation = flushable(
    () => fn(isHidePending),
    isHidePending ? 0 : delay,
  )

  // return a function to cancel show() from executing
  // in the case of multiple tooltips
  return showOperation.cancel
}

function hide(fn: (flushed: boolean) => void, delay: number) {
  // setup the hide operation using flushable
  hideOperation = flushable((flushed) => fn(flushed), delay)

  // return a function to cancel hide() from executing
  return hideOperation.cancel
}

export interface UseTooltipProps {
  /**
   * Delay (in ms) before hiding the tooltip
   * @default 200ms
   */
  hideDelay?: number
  /**
   * Delay (in ms) before showing the tooltip
   * @default 200ms
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

  const tooltipId = useId(id, "tooltip")

  React.useEffect(() => {
    if (isOpen) {
      activeId = tooltipId
    }
  }, [isOpen, tooltipId])

  const ref = React.useRef<any>(null)
  const triggerRef = mergeRefs(ref, popper.reference.ref)
  const flushRef = React.useRef<Function>()

  React.useEffect(() => {
    return () => flushRef.current?.()
  }, [])

  const hideImmediately = React.useCallback(() => {
    flushRef.current?.()
    close()
  }, [close])

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
    flushRef.current?.()

    if (tooltipId !== activeId) {
      hideImmediately()
    }

    activeId = tooltipId

    if (!isOpen) {
      flushRef.current = show(() => {
        open()
      }, showDelay)
    }
  }, [isOpen, showDelay, open, tooltipId, hideImmediately])

  const hideTooltip = React.useCallback(() => {
    flushRef.current?.()
    activeId = null

    if (isOpen) {
      flushRef.current = hide(() => {
        close()
      }, hideDelay)
    }
  }, [isOpen, hideDelay, close])

  const onMouseOver = React.useCallback(
    (event: React.MouseEvent) => {
      const isSelf = event.currentTarget === (ref.current as HTMLElement)

      if (isOpen && isSelf) {
        return
      }

      showTooltip()
    },
    [isOpen, showTooltip],
  )

  /**
   * Accessibility: Close the tooltip if user presses escape
   */
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
