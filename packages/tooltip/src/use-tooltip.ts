import { useDisclosure, useEventListener, useId } from "@chakra-ui/hooks"
import { Placement, usePopper, UsePopperProps } from "@chakra-ui/popper"
import { callAllHandlers, Dict, mergeRefs } from "@chakra-ui/utils"
import { Ref, useCallback, useEffect, useRef } from "react"

export interface UseTooltipProps {
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
  /**
   * The size of the arrow in css units (numeric)
   * @default 10 ( = 10px )
   */
  arrowSize?: UsePopperProps["arrowSize"]
  /**
   * The Popper.js modifiers to use
   */
  modifiers?: UsePopperProps["modifiers"]
  /**
   * If `true`, the tooltip will not be shown on any trigger
   */
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
    ...htmlProps
  } = props

  const { isOpen, onOpen, onClose } = useDisclosure({
    isOpen: isOpenProp,
    defaultIsOpen,
    onOpen: onOpenProp,
    onClose: onCloseProp,
  })

  const popper = usePopper({
    forceUpdate: isOpen,
    placement,
    arrowSize,
    modifiers,
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

  const getTriggerProps = useCallback(
    (props: Dict = {}, ref: Ref<any> = null) => ({
      ...props,
      ref: mergeRefs(ref, triggerRef),
      onMouseLeave: callAllHandlers(props.onMouseLeave, closeWithDelay),
      onMouseEnter: callAllHandlers(props.onMouseEnter, openWithDelay),
      onClick: callAllHandlers(props.onClick, onClick),
      onMouseDown: callAllHandlers(props.onMouseDown, onMouseDown),
      onFocus: callAllHandlers(props.onFocus, openWithDelay),
      onBlur: callAllHandlers(props.onBlur, closeWithDelay),
      "aria-describedby": isOpen ? tooltipId : undefined,
    }),
    [
      closeWithDelay,
      isOpen,
      onClick,
      onMouseDown,
      openWithDelay,
      tooltipId,
      triggerRef,
    ],
  )

  const getTooltipProps = useCallback(
    (props: Dict = {}, ref: Ref<any> = null) => ({
      ...htmlProps,
      ...props,
      id: tooltipId,
      role: "tooltip",
      ref: mergeRefs(ref, popper.popper.ref),
      style: {
        ...props.style,
        ...popper.popper.style,
      },
    }),
    [htmlProps, popper.popper.ref, popper.popper.style, tooltipId],
  )

  const getArrowProps = useCallback(
    (props: Dict = {}, ref: Ref<any> = null) => ({
      ...props,
      ref: mergeRefs(ref, popper.arrow.ref),
      style: { ...props.style, ...popper.arrow.style },
    }),
    [popper.arrow.ref, popper.arrow.style],
  )

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
