import { useDisclosure, useEventListener, useId } from "@chakra-ui/hooks"
import { Placement, usePopper, UsePopperProps } from "@chakra-ui/popper"
import { callAllHandlers, mergeRefs, Dict } from "@chakra-ui/utils"
import * as React from "react"

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
  closeOnClick?: boolean
  /**
   * If `true`, the tooltip will hide while the mouse
   * is down
   */
  closeOnMouseDown?: boolean
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
    showDelay = 0,
    hideDelay = 0,
    closeOnClick = true,
    closeOnMouseDown,
    onShow,
    onHide,
    placement,
    id,
    isOpen: isOpenProp,
    defaultIsOpen,
    arrowSize = 10,
  } = props

  const { isOpen, onOpen, onClose } = useDisclosure({
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

  const ref = React.useRef<any>(null)
  const triggerRef = mergeRefs(ref, popper.reference.ref)

  const enterTimeoutRef = React.useRef<NodeJS.Timeout>()
  const exitTimeoutRef = React.useRef<NodeJS.Timeout>()

  const openWithDelay = () => {
    enterTimeoutRef.current = setTimeout(onOpen, showDelay)
  }

  const closeWithDelay = () => {
    if (enterTimeoutRef.current) {
      clearTimeout(enterTimeoutRef.current)
    }
    exitTimeoutRef.current = setTimeout(onClose, hideDelay)
  }

  const onClick = () => {
    if (closeOnClick) {
      onClose()
    }
  }

  const onMouseDown = () => {
    if (closeOnMouseDown) {
      onClose()
    }
  }

  const onKeyDown = (event: KeyboardEvent) => {
    if (isOpen && event.key === "Escape") {
      onClose()
    }
  }

  useEventListener("keydown", onKeyDown)

  return {
    isOpen,
    show: open,
    hide: close,
    placement: popper.placement,
    getTriggerProps: (props: Dict = {}) => ({
      ...props,
      ref: mergeRefs(props.ref, triggerRef),
      onMouseLeave: callAllHandlers(props.onMouseLeave, closeWithDelay),
      onMouseEnter: callAllHandlers(props.onMouseEnter, openWithDelay),
      onClick: callAllHandlers(props.onClick, onClick),
      onMouseDown: callAllHandlers(props.onMouseDown, onMouseDown),
      onFocus: callAllHandlers(props.onFocus, openWithDelay),
      onBlur: callAllHandlers(props.onBlur, closeWithDelay),
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
