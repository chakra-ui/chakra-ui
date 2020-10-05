import { useDisclosure, useEventListener, useId } from "@chakra-ui/hooks"
import { Placement, usePopper, UsePopperProps } from "@chakra-ui/popper"
import { callAllHandlers, mergeRefs, PropGetter } from "@chakra-ui/utils"
import { useCallback, useEffect, useRef } from "react"

export interface UseTooltipProps
  extends Pick<
    UsePopperProps,
    "arrowSize" | "modifiers" | "gutter" | "offset"
  > {
  /**
   * Delay (in ms) before showing the tooltip
   * @default 0ms
   */
  openDelay?: number
  /**
   * Delay (in ms) before hiding the tooltip
   * @default 0ms
   */
  closeDelay?: number
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
  onOpen?(): void
  /**
   * Callback to run when the tooltip hides
   */
  onClose?(): void
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
  isDisabled?: boolean
}

export function useTooltip(props: UseTooltipProps = {}) {
  const {
    openDelay = 0,
    closeDelay = 0,
    closeOnClick = true,
    closeOnMouseDown,
    onOpen: onOpenProp,
    onClose: onCloseProp,
    placement,
    id,
    isOpen: isOpenProp,
    defaultIsOpen,
    arrowSize = 10,
    modifiers,
    isDisabled,
    gutter,
    offset,
    ...htmlProps
  } = props

  const { isOpen, onOpen, onClose } = useDisclosure({
    isOpen: isOpenProp,
    defaultIsOpen,
    onOpen: onOpenProp,
    onClose: onCloseProp,
  })

  const popper = usePopper({
    placement,
    arrowSize,
    modifiers,
    gutter,
    offset,
  })

  const tooltipId = useId(id, "tooltip")

  const ref = useRef<any>(null)
  const triggerRef = mergeRefs(ref, popper.reference.ref)

  const enterTimeout = useRef<number>()
  const exitTimeout = useRef<number>()

  const openWithDelay = useCallback(() => {
    if (!isDisabled) {
      enterTimeout.current = window.setTimeout(onOpen, openDelay)
    }
  }, [isDisabled, onOpen, openDelay])

  const closeWithDelay = useCallback(() => {
    if (enterTimeout.current) {
      clearTimeout(enterTimeout.current)
    }
    exitTimeout.current = window.setTimeout(onClose, closeDelay)
  }, [closeDelay, onClose])

  const onClick = useCallback(() => {
    if (closeOnClick) {
      closeWithDelay()
    }
  }, [closeOnClick, closeWithDelay])

  const onMouseDown = useCallback(() => {
    if (closeOnMouseDown) {
      closeWithDelay()
    }
  }, [closeOnMouseDown, closeWithDelay])

  const onKeyDown = (event: KeyboardEvent) => {
    if (isOpen && event.key === "Escape") {
      closeWithDelay()
    }
  }

  useEventListener("keydown", onKeyDown)

  useEffect(() => {
    return () => {
      clearTimeout(enterTimeout.current)
      clearTimeout(exitTimeout.current)
    }
  }, [])

  const getTriggerProps: PropGetter = (props = {}, ref = null) => ({
    ...props,
    ref: mergeRefs(ref, triggerRef),
    onMouseLeave: callAllHandlers(props.onMouseLeave, closeWithDelay),
    onMouseEnter: callAllHandlers(props.onMouseEnter, openWithDelay),
    onClick: callAllHandlers(props.onClick, onClick),
    onMouseDown: callAllHandlers(props.onMouseDown, onMouseDown),
    onFocus: callAllHandlers(props.onFocus, openWithDelay),
    onBlur: callAllHandlers(props.onBlur, closeWithDelay),
    "aria-describedby": isOpen ? tooltipId : undefined,
  })

  const getTooltipProps: PropGetter = (props = {}, ref = null) => ({
    ...htmlProps,
    ...props,
    id: tooltipId,
    role: "tooltip",
    ref: mergeRefs(ref, popper.popper.ref),
    style: {
      ...props.style,
      ...popper.popper.style,
    },
  })

  const getArrowProps: PropGetter = (props = {}, ref = null) => ({
    ...props,
    children: popper.arrow.children,
    ref: mergeRefs(ref, popper.arrow.ref),
    style: { ...props.style, ...popper.arrow.style },
  })

  return {
    isOpen,
    show: openWithDelay,
    hide: closeWithDelay,
    placement: popper.placement,
    getTriggerProps,
    getTooltipProps,
    getArrowProps,
  }
}

export type UseTooltipReturn = ReturnType<typeof useTooltip>
