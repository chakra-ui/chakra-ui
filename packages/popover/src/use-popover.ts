import { useBoolean, useDisclosure, useIds } from "@chakra-ui/hooks"
import { Placement, usePopper, UsePopperProps } from "@chakra-ui/popper"
import { useColorModeValue, useToken } from "@chakra-ui/system"
import {
  callAllHandlers,
  Focusable,
  HTMLProps,
  mergeRefs,
  PropGetter,
} from "@chakra-ui/utils"
import { useInteractOutside } from "@react-aria/interactions"
import { RefObject, useCallback, useEffect, useRef } from "react"
import { useFocusOnHide, useFocusOnShow } from "./popover.utils"

const TRIGGER_TYPE = {
  click: "click",
  hover: "hover",
} as const

export interface UsePopoverProps {
  /**
   * The html `id` attribute of the popover.
   * If not provided, we generate a unique id.
   *
   * This `id` is also used to auto-generate the `aria-labelledby`
   * and `aria-decribedby` attributes that points to the `PopoverHeader` and `PopoverBody`
   */
  id?: string
  /**
   * If `true`, the popover will be opened in controlled mode.
   */
  isOpen?: boolean
  /**
   * If `true`, the popover will be initially opened.
   */
  defaultIsOpen?: boolean
  /**
   * The `ref` of the element that should receive focus when the popover opens.
   */
  initialFocusRef?: RefObject<Focusable>
  /**
   * If `true`, focus will be returned to the element that triggers the popover
   * when it closes
   */
  returnFocus?: boolean
  /**
   * If `true`, focus will be transferred to the first interactive element
   * when the popover opens
   */
  autoFocus?: boolean
  /**
   * The gap (in pixels) to apply between the popover and the target.
   * Used by `popper.js`
   */
  gutter?: number
  /**
   * The placment of the popover
   */
  placement?: Placement
  /**
   * If `true`, the popover will close when you blur out it by
   * clicking outside or tabbing out
   */
  closeOnBlur?: boolean
  /**
   * If `true`, the popover will close when you hit the `Esc` key
   */
  closeOnEsc?: boolean
  /**
   * Callback fired when the popover opens
   */
  onOpen?: () => void
  /**
   * Callback fired when the popover closes
   */
  onClose?: () => void
  /**
   * The size of the popover arrow
   */
  arrowSize?: number
  /**
   * The `box-shadow` of the popover arrow
   */
  arrowShadowColor?: string
  /**
   * The Popper.js modifiers to use.
   */
  modifiers?: UsePopperProps["modifiers"]
  /**
   * The interaction that triggers the popover.
   *
   * `hover` - means the popover will open when you hover with mouse or
   * focus with keyboard on the popover trigger
   *
   * `click` - means the popover will open on click or
   * press `Enter` to `Space` on keyboard
   */
  trigger?: keyof typeof TRIGGER_TYPE
  openDelay?: number
  closeDelay?: number
  /**
   * Performance 🚀:
   * If `true`, the PopoverContent rendering will be deferred
   * until the popover is open.
   */
  isLazy?: boolean
}

export function usePopover(props: UsePopoverProps = {}) {
  const {
    closeOnBlur = true,
    closeOnEsc = true,
    initialFocusRef,
    placement: placementProp,
    gutter,
    id,
    arrowSize,
    returnFocus = true,
    autoFocus = true,
    arrowShadowColor,
    modifiers,
    trigger = TRIGGER_TYPE.click,
    openDelay = 200,
    closeDelay = 200,
    isLazy,
  } = props

  const { isOpen, onClose, onOpen, onToggle } = useDisclosure(props)

  const triggerRef = useRef<HTMLElement>(null)
  const popoverRef = useRef<HTMLElement>(null)

  const isHoveringRef = useRef(false)

  const [hasHeader, setHasHeader] = useBoolean()
  const [hasBody, setHasBody] = useBoolean()

  const [triggerId, popoverId, headerId, bodyId] = useIds(
    id,
    "popover-trigger",
    "popover-content",
    "popover-header",
    "popover-body",
  )

  const fallbackShadowColor = useColorModeValue("gray.200", "whiteAlpha.300")
  const shadowColor = arrowShadowColor ?? fallbackShadowColor
  const arrowColor = useToken("colors", shadowColor, arrowShadowColor)

  const { popper, reference, arrow } = usePopper({
    placement: placementProp,
    gutter,
    forceUpdate: isOpen,
    arrowSize,
    arrowShadowColor: arrowColor,
    modifiers,
  })

  useFocusOnHide(popoverRef, {
    autoFocus: returnFocus,
    visible: isOpen,
    focusRef: triggerRef,
    trigger,
  })

  useFocusOnShow(popoverRef, {
    autoFocus: autoFocus,
    visible: isOpen,
    focusRef: initialFocusRef,
    trigger,
  })

  useInteractOutside({
    ref: popoverRef,
    onInteractOutside: (event) => {
      if (
        trigger === TRIGGER_TYPE.click &&
        closeOnBlur &&
        !triggerRef.current?.contains(event.target as HTMLElement)
      ) {
        onClose()
      }
    },
  })

  const getPopoverProps: PropGetter = useCallback(
    (props = {}, ref = null) => {
      const popoverProps: HTMLProps = {
        ...props,
        children: isLazy ? (isOpen ? props.children : null) : props.children,
        id: popoverId,
        tabIndex: -1,
        hidden: !isOpen,
        role: "dialog",
        onKeyDown: callAllHandlers(props.onKeyDown, (event) => {
          if (closeOnEsc && event.key === "Escape") {
            onClose()
          }
        }),
        ref: mergeRefs(popoverRef, popper.ref, ref),
        style: { ...props.style, ...popper.style },
        "aria-labelledby": hasHeader ? headerId : undefined,
        "aria-describedby": hasBody ? bodyId : undefined,
      }

      if (trigger === TRIGGER_TYPE.hover) {
        popoverProps.role = "tooltip"
        popoverProps.onMouseEnter = callAllHandlers(props.onMouseEnter, () => {
          isHoveringRef.current = true
        })
        popoverProps.onMouseLeave = callAllHandlers(props.onMouseLeave, () => {
          isHoveringRef.current = false
          setTimeout(onClose, closeDelay)
        })
      }

      return popoverProps
    },
    [
      popoverId,
      isOpen,
      isLazy,
      popper.ref,
      popper.style,
      hasHeader,
      headerId,
      hasBody,
      bodyId,
      trigger,
      closeOnEsc,
      onClose,
      closeDelay,
    ],
  )

  const getArrowProps: PropGetter = useCallback(
    (props = {}, ref = null) => ({
      ...props,
      ref: mergeRefs(arrow.ref, ref),
      style: {
        ...props.style,
        ...arrow.style,
      },
    }),
    [arrow.ref, arrow.style],
  )

  const openTimeout = useRef<number>()
  const closeTimeout = useRef<number>()

  const getTriggerProps: PropGetter = useCallback(
    (props = {}, ref = null) => {
      const triggerProps: HTMLProps = {
        ...props,
        id: triggerId,
        ref: mergeRefs(triggerRef, reference.ref, ref),
        "aria-haspopup": "dialog",
        "aria-expanded": isOpen,
        "aria-controls": popoverId,
      }

      if (trigger === TRIGGER_TYPE.click) {
        triggerProps.onClick = callAllHandlers(props.onClick, onToggle)
      }

      if (trigger === TRIGGER_TYPE.hover) {
        /**
         * Any content that shows on pointer hover should also show on keyboard focus.
         * Consider focus and blur to be the `hover` for keyboard users.
         *
         * @see https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html
         */
        triggerProps.onFocus = callAllHandlers(props.onFocus, onOpen)
        triggerProps.onBlur = callAllHandlers(props.onBlur, onClose)

        /**
         * Any content that shows on hover or focus must be dismissible.
         * This case pressing `Escape` will dismiss the popover
         */
        triggerProps.onKeyDown = callAllHandlers(props.onKeyDown, (event) => {
          if (event.key === "Escape") {
            onClose()
          }
        })

        triggerProps.onMouseEnter = callAllHandlers(props.onMouseEnter, () => {
          isHoveringRef.current = true
          openTimeout.current = window.setTimeout(onOpen, openDelay)
        })

        triggerProps.onMouseLeave = callAllHandlers(props.onMouseLeave, () => {
          isHoveringRef.current = false

          if (openTimeout.current) {
            clearTimeout(openTimeout.current)
            openTimeout.current = undefined
          }

          closeTimeout.current = window.setTimeout(() => {
            if (isHoveringRef.current === false) {
              onClose()
            }
          }, closeDelay)
        })
      }

      return triggerProps
    },
    [
      openDelay,
      closeDelay,
      isOpen,
      onToggle,
      popoverId,
      reference.ref,
      triggerId,
      trigger,
      onOpen,
      onClose,
    ],
  )

  useEffect(() => {
    return () => {
      if (openTimeout.current) {
        clearTimeout(openTimeout.current)
      }

      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current)
      }
    }
  }, [])

  return {
    isOpen,
    onClose,
    headerId,
    hasHeader,
    setHasHeader,
    bodyId,
    hasBody,
    setHasBody,
    getArrowProps,
    getTriggerProps,
    getPopoverProps,
  }
}

export type UsePopoverReturn = ReturnType<typeof usePopover>
