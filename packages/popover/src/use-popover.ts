import { useBoolean, useDisclosure, useIds } from "@chakra-ui/hooks"
import { Placement, usePopper, UsePopperProps } from "@chakra-ui/popper"
import { useColorModeValue, useToken } from "@chakra-ui/system"
import {
  callAllHandlers,
  FocusableElement,
  HTMLProps,
  mergeRefs,
  PropGetter,
  mergeWith,
} from "@chakra-ui/utils"
import { useInteractOutside } from "@react-aria/interactions"
import { RefObject, useCallback, useEffect, useRef } from "react"
import { focusPopover, useFocusOnHide, useFocusOnShow } from "./popover.utils"

const TRIGGER = {
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
  initialFocusRef?: RefObject<FocusableElement>
  /**
   * If `true`, focus will be returned to the element that triggers the popover
   * when it closes
   */
  returnFocusOnClose?: boolean
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
  trigger?: keyof typeof TRIGGER
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
    returnFocusOnClose = true,
    autoFocus = true,
    arrowShadowColor,
    modifiers,
    trigger = TRIGGER.click,
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

  const popper = usePopper({
    placement: placementProp,
    gutter,
    arrowSize,
    arrowShadowColor: arrowColor,
    modifiers,
  })

  useFocusOnHide(popoverRef, {
    autoFocus: returnFocusOnClose,
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
        trigger === TRIGGER.click &&
        closeOnBlur &&
        !triggerRef.current?.contains(event.target as HTMLElement)
      ) {
        onClose()
      }
    },
  })

  const getPopoverProps: PropGetter = useCallback(
    (props = {}, _ref = null) => {
      const popoverProps: HTMLProps = {
        ...props,
        ref: mergeRefs(popoverRef, _ref),
        children: isLazy ? (isOpen ? props.children : null) : props.children,
        id: popoverId,
        tabIndex: -1,
        role: "dialog",
        onKeyDown: callAllHandlers(props.onKeyDown, (event) => {
          if (closeOnEsc && event.key === "Escape") onClose()
        }),
        "aria-labelledby": hasHeader ? headerId : undefined,
        "aria-describedby": hasBody ? bodyId : undefined,
      }

      if (trigger === TRIGGER.hover) {
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
      isLazy,
      isOpen,
      popoverId,
      hasHeader,
      headerId,
      hasBody,
      bodyId,
      trigger,
      popper,
      closeOnEsc,
      onClose,
      closeDelay,
    ],
  )

  const getPopoverWrapperProps: PropGetter = (props = {}, _ref = null) =>
    getPopperProps(
      mergeWith(props, {
        style: { visibility: isOpen ? "visible" : "hidden" },
      }),
      _ref,
    )

  const openTimeout = useRef<number>()
  const closeTimeout = useRef<number>()

  const getTriggerProps: PropGetter = useCallback(
    (props = {}, _ref = null) => {
      const triggerProps: HTMLProps = {
        ...props,
        id: triggerId,
        "aria-haspopup": "dialog",
        "aria-expanded": isOpen,
        "aria-controls": popoverId,
      }

      if (trigger === TRIGGER.click) {
        triggerProps.onClick = callAllHandlers(props.onClick, onToggle)
      }

      if (trigger === TRIGGER.hover) {
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

      return popper.getReferenceProps(triggerProps, mergeRefs(triggerRef, _ref))
    },
    [
      triggerId,
      isOpen,
      popoverId,
      trigger,
      popper,
      onToggle,
      onOpen,
      onClose,
      openDelay,
      closeDelay,
    ],
  )

  useEffect(() => {
    return () => {
      if (openTimeout.current) clearTimeout(openTimeout.current)
      if (closeTimeout.current) clearTimeout(closeTimeout.current)
    }
  }, [])

  const {
    transformOrigin,
    getArrowProps,
    getArrowWrapperProps,
    getPopperProps,
  } = popper

  /**
   * When adding animations/transitions, the focus logic might not work as expected.
   * We'll use this to trigger focus again.
   */
  const refocusPopover = () => {
    const targetIsPopover = document.activeElement !== popoverRef.current
    const isWithinPopover = popoverRef.current?.contains(document.activeElement)

    if (isOpen && (targetIsPopover || !isWithinPopover)) {
      focusPopover(popoverRef)
    }
  }

  return {
    isOpen,
    onClose,
    headerId,
    hasHeader,
    setHasHeader,
    bodyId,
    hasBody,
    setHasBody,
    refocusPopover,
    transformOrigin,
    getArrowProps,
    getArrowWrapperProps,
    getPopoverWrapperProps,
    getPopoverProps,
    getTriggerProps,
  }
}

export type UsePopoverReturn = ReturnType<typeof usePopover>
