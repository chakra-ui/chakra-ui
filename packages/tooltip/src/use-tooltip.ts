import { useEventListener } from "@chakra-ui/react-use-event-listener"
import { useDisclosure } from "@chakra-ui/react-use-disclosure"
import { popperCSSVars, usePopper, UsePopperProps } from "@chakra-ui/popper"
import { mergeRefs } from "@chakra-ui/react-use-merge-refs"
import { PropGetter } from "@chakra-ui/react-types"
import { callAllHandlers } from "@chakra-ui/shared-utils"
import { useCallback, useEffect, useRef, useId } from "react"

export interface UseTooltipProps
  extends Pick<
    UsePopperProps,
    | "modifiers"
    | "gutter"
    | "offset"
    | "arrowPadding"
    | "direction"
    | "placement"
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
   * @default true
   */
  closeOnClick?: boolean
  /**
   * If `true`, the tooltip will hide while the mouse
   * is down
   */
  closeOnMouseDown?: boolean
  /**
   * If `true`, the tooltip will hide on pressing Esc key
   * @default true
   */
  closeOnEsc?: boolean
  /**
   * Callback to run when the tooltip shows
   */
  onOpen?(): void
  /**
   * Callback to run when the tooltip hides
   */
  onClose?(): void
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
  /**
   * @default 10
   */
  arrowSize?: number
  arrowShadowColor?: string
}

export function useTooltip(props: UseTooltipProps = {}) {
  const {
    openDelay = 0,
    closeDelay = 0,
    closeOnClick = true,
    closeOnMouseDown,
    closeOnEsc = true,
    onOpen: onOpenProp,
    onClose: onCloseProp,
    placement,
    id,
    isOpen: isOpenProp,
    defaultIsOpen,
    arrowSize = 10,
    arrowShadowColor,
    arrowPadding,
    modifiers,
    isDisabled,
    gutter,
    offset,
    direction,
    ...htmlProps
  } = props

  const { isOpen, onOpen, onClose } = useDisclosure({
    isOpen: isOpenProp,
    defaultIsOpen,
    onOpen: onOpenProp,
    onClose: onCloseProp,
  })

  const { referenceRef, getPopperProps, getArrowInnerProps, getArrowProps } =
    usePopper({
      enabled: isOpen,
      placement,
      arrowPadding,
      modifiers,
      gutter,
      offset,
      direction,
    })

  const uuid = useId()
  const uid = id ?? uuid
  const tooltipId = `tooltip-${uid}`

  const ref = useRef<Element>(null)

  const enterTimeout = useRef<number>()
  const exitTimeout = useRef<number>()

  const openWithDelay = useCallback(() => {
    if (!isDisabled && !enterTimeout.current) {
      enterTimeout.current = window.setTimeout(onOpen, openDelay)
    }
  }, [isDisabled, onOpen, openDelay])

  const closeWithDelay = useCallback(() => {
    if (enterTimeout.current) {
      clearTimeout(enterTimeout.current)
      enterTimeout.current = undefined
    }
    exitTimeout.current = window.setTimeout(onClose, closeDelay)
  }, [closeDelay, onClose])

  const onClick = useCallback(() => {
    if (isOpen && closeOnClick) {
      closeWithDelay()
    }
  }, [closeOnClick, closeWithDelay, isOpen])

  const onMouseDown = useCallback(() => {
    if (isOpen && closeOnMouseDown) {
      closeWithDelay()
    }
  }, [closeOnMouseDown, closeWithDelay, isOpen])

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (isOpen && event.key === "Escape") {
        closeWithDelay()
      }
    },
    [isOpen, closeWithDelay],
  )

  useEventListener(
    function getElement() {
      return ref.current?.ownerDocument ?? document
    },
    "keydown",
    closeOnEsc ? onKeyDown : undefined,
  )

  useEffect(
    () => () => {
      clearTimeout(enterTimeout.current)
      clearTimeout(exitTimeout.current)
    },
    [],
  )

  /**
   * This allows for catching mouseleave events when the tooltip
   * trigger is disabled. There's currently a known issue in
   * React regarding the onMouseLeave polyfill.
   * @see https://github.com/facebook/react/issues/11972
   */
  useEventListener(
    function getElement() {
      return ref.current
    },
    "mouseleave",
    closeWithDelay,
  )

  const getTriggerProps: PropGetter = useCallback(
    (props = {}, _ref = null) => {
      const triggerProps = {
        ...props,
        ref: mergeRefs(ref, _ref, referenceRef),
        onMouseEnter: callAllHandlers(props.onMouseEnter, openWithDelay),
        onClick: callAllHandlers(props.onClick, onClick),
        onMouseDown: callAllHandlers(props.onMouseDown, onMouseDown),
        onFocus: callAllHandlers(props.onFocus, openWithDelay),
        onBlur: callAllHandlers(props.onBlur, closeWithDelay),
        "aria-describedby": isOpen ? tooltipId : undefined,
      }

      return triggerProps
    },
    [
      openWithDelay,
      closeWithDelay,
      onMouseDown,
      isOpen,
      tooltipId,
      onClick,
      referenceRef,
    ],
  )

  const getTooltipPositionerProps: PropGetter = useCallback(
    (props = {}, forwardedRef = null) =>
      getPopperProps(
        {
          ...props,
          style: {
            ...props.style,
            [popperCSSVars.arrowSize.var]: arrowSize
              ? `${arrowSize}px`
              : undefined,
            [popperCSSVars.arrowShadowColor.var]: arrowShadowColor,
          },
        },
        forwardedRef,
      ),
    [getPopperProps, arrowSize, arrowShadowColor],
  )

  const getTooltipProps: PropGetter = useCallback(
    (props = {}, ref = null) => {
      const styles: React.CSSProperties = {
        ...props.style,
        position: "relative",
        transformOrigin: popperCSSVars.transformOrigin.varRef,
      }

      return {
        ref,
        ...htmlProps,
        ...props,
        id: tooltipId,
        role: "tooltip",
        style: styles,
      }
    },
    [htmlProps, tooltipId],
  )

  return {
    isOpen,
    show: openWithDelay,
    hide: closeWithDelay,
    getTriggerProps,
    getTooltipProps,
    getTooltipPositionerProps,
    getArrowProps,
    getArrowInnerProps,
  }
}

export type UseTooltipReturn = ReturnType<typeof useTooltip>
