import {
  useBoolean,
  useDisclosure,
  useFocusOnHide,
  useFocusOnShow,
  useIds,
  useOutsideClick,
} from "@chakra-ui/hooks"
import {
  Placement,
  usePopper,
  UsePopperProps,
  popperCSSVars,
} from "@chakra-ui/popper"
import { useColorModeValue, useToken } from "@chakra-ui/system"
import {
  callAllHandlers,
  FocusableElement,
  HTMLProps,
  mergeRefs,
  PropGetter,
  px,
} from "@chakra-ui/utils"
import { RefObject, useCallback, useEffect, useRef } from "react"

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
   * The placement of the popover
   */
  placement?: Placement
  /**
   * The flip of the popover
   */
  flip?: boolean
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
    flip,
    gutter,
    id,
    arrowSize,
    returnFocusOnClose = true,
    autoFocus = true,
    arrowShadowColor: arrowShadowColorProp,
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
  const shadowColor = arrowShadowColorProp ?? fallbackShadowColor
  const arrowShadowColor = useToken("colors", shadowColor, arrowShadowColorProp)

  const popper = usePopper({
    placement: placementProp,
    flip,
    gutter,
    modifiers,
  })

  useFocusOnHide(popoverRef, {
    focusRef: triggerRef,
    visible: isOpen,
    shouldFocus: returnFocusOnClose && trigger === TRIGGER.click,
  })

  useFocusOnShow(popoverRef, {
    focusRef: initialFocusRef,
    visible: isOpen,
    shouldFocus: autoFocus && trigger === TRIGGER.click,
  })

  useOutsideClick({
    ref: popoverRef,
    handler(event) {
      if (
        isOpen &&
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
        style: {
          ...props.style,
          transformOrigin: popperCSSVars.transformOrigin.varRef,
        },
        ref: mergeRefs(popoverRef, _ref),
        children: !isLazy || isOpen ? props.children : null,
        id: popoverId,
        tabIndex: -1,
        role: "dialog",
        onKeyDown: callAllHandlers(props.onKeyDown, (event) => {
          if (closeOnEsc && event.key === "Escape") {
            onClose()
          }
        }),
        onBlur: callAllHandlers(props.onBlur, (event) => {
          const element = (event.relatedTarget ??
            document.activeElement) as HTMLElement

          if (
            isOpen &&
            closeOnBlur &&
            !popoverRef.current?.contains(element) &&
            !triggerRef.current?.contains(element)
          ) {
            onClose()
          }
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
      closeOnEsc,
      onClose,
      closeDelay,
      closeOnBlur,
    ],
  )

  const getPopoverPositionerProps: PropGetter = useCallback(
    (props = {}, _ref = null) => ({
      ...props,
      ref: mergeRefs(popper.popperRef, _ref),
      style: {
        ...props.style,
        [popperCSSVars.arrowSize.var]: arrowSize ? px(arrowSize) : undefined,
        [popperCSSVars.arrowShadowColor.var]: arrowShadowColor,
        visibility: isOpen ? "visible" : "hidden",
      },
    }),
    [arrowShadowColor, arrowSize, isOpen, popper.popperRef],
  )

  const openTimeout = useRef<number>()
  const closeTimeout = useRef<number>()

  const getTriggerProps: PropGetter = useCallback(
    (props = {}, _ref = null) => {
      const triggerProps: HTMLProps = {
        ...props,
        ref: mergeRefs(triggerRef, _ref, popper.referenceRef),
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

      return triggerProps
    },
    [
      triggerId,
      isOpen,
      popoverId,
      trigger,
      popper.referenceRef,
      onToggle,
      onOpen,
      onClose,
      openDelay,
      closeDelay,
    ],
  )

  useEffect(
    () => () => {
      if (openTimeout.current) clearTimeout(openTimeout.current)
      if (closeTimeout.current) clearTimeout(closeTimeout.current)
    },
    [],
  )

  const onTransitionEnd = () => {
    popoverRef.current?.dispatchEvent(new Event("transitionend"))
  }

  return {
    forceUpdate: popper.forceUpdate,
    isOpen,
    onClose,
    headerId,
    hasHeader,
    setHasHeader,
    bodyId,
    hasBody,
    setHasBody,
    onTransitionEnd,
    getPopoverPositionerProps,
    getPopoverProps,
    getTriggerProps,
  }
}

export type UsePopoverReturn = ReturnType<typeof usePopover>
