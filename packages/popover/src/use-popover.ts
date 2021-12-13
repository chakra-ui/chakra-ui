import {
  useDisclosure,
  useFocusOnHide,
  useFocusOnPointerDown,
  useFocusOnShow,
  useIds,
} from "@chakra-ui/hooks"
import { popperCSSVars, usePopper, UsePopperProps } from "@chakra-ui/popper"
import { HTMLProps, mergeRefs, PropGetter } from "@chakra-ui/react-utils"
import {
  callAllHandlers,
  contains,
  determineLazyBehavior,
  FocusableElement,
  getRelatedTarget,
  LazyBehavior,
  px,
} from "@chakra-ui/utils"
import { RefObject, useCallback, useEffect, useRef, useState } from "react"

const TRIGGER = {
  click: "click",
  hover: "hover",
} as const

export interface UsePopoverProps extends Omit<UsePopperProps, "enabled"> {
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
  /**
   * Performance 🚀:
   * The lazy behavior of popover's content when not visible.
   * Only works when `isLazy={true}`
   *
   * - "unmount": The popover's content is always unmounted when not open.
   * - "keepMounted": The popover's content initially unmounted,
   * but stays mounted when popover is open.
   *
   * @default "unmount"
   */
  lazyBehavior?: LazyBehavior
  /**
   * If `true`, the popover will be positioned when it mounts
   * (even if it's not open)
   *
   * Note 🚨: We don't recommend using this in a popover/menu intensive UI or page
   * as it might affect scrolling performance.
   */
  computePositionOnMount?: boolean
}

/**
 * @internal
 */
export function usePopover(props: UsePopoverProps = {}) {
  const {
    closeOnBlur = true,
    closeOnEsc = true,
    initialFocusRef,
    id,
    returnFocusOnClose = true,
    autoFocus = true,
    arrowSize,
    arrowShadowColor,
    trigger = TRIGGER.click,
    openDelay = 200,
    closeDelay = 200,
    isLazy,
    lazyBehavior = "unmount",
    computePositionOnMount,
    ...popperProps
  } = props

  const { isOpen, onClose, onOpen, onToggle } = useDisclosure(props)

  const anchorRef = useRef<HTMLElement>(null)
  const triggerRef = useRef<HTMLElement>(null)
  const popoverRef = useRef<HTMLElement>(null)

  const isHoveringRef = useRef(false)

  const hasBeenOpened = useRef(false)
  if (isOpen) {
    hasBeenOpened.current = true
  }

  const [hasHeader, setHasHeader] = useState(false)
  const [hasBody, setHasBody] = useState(false)

  const [triggerId, popoverId, headerId, bodyId] = useIds(
    id,
    "popover-trigger",
    "popover-content",
    "popover-header",
    "popover-body",
  )

  const {
    referenceRef,
    getArrowProps,
    getPopperProps,
    getArrowInnerProps,
    forceUpdate,
  } = usePopper({
    ...popperProps,
    enabled: isOpen || !!computePositionOnMount,
  })

  useFocusOnPointerDown({
    enabled: isOpen,
    ref: triggerRef,
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

  const shouldRenderChildren = determineLazyBehavior({
    hasBeenSelected: hasBeenOpened.current,
    isLazy,
    lazyBehavior,
    isSelected: isOpen,
  })

  const getPopoverProps: PropGetter = useCallback(
    (props = {}, _ref = null) => {
      const popoverProps: HTMLProps = {
        ...props,
        style: {
          ...props.style,
          transformOrigin: popperCSSVars.transformOrigin.varRef,
          [popperCSSVars.arrowSize.var]: arrowSize ? px(arrowSize) : undefined,
          [popperCSSVars.arrowShadowColor.var]: arrowShadowColor,
        },
        ref: mergeRefs(popoverRef, _ref),
        children: shouldRenderChildren ? props.children : null,
        id: popoverId,
        tabIndex: -1,
        role: "dialog",
        onKeyDown: callAllHandlers(props.onKeyDown, (event) => {
          if (closeOnEsc && event.key === "Escape") {
            onClose()
          }
        }),
        onBlur: callAllHandlers(props.onBlur, (event) => {
          const relatedTarget = getRelatedTarget(event)
          const targetIsPopover = contains(popoverRef.current, relatedTarget)
          const targetIsTrigger = contains(triggerRef.current, relatedTarget)
          const isValidBlur = !targetIsPopover && !targetIsTrigger

          if (isOpen && closeOnBlur && isValidBlur) {
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
      shouldRenderChildren,
      popoverId,
      hasHeader,
      headerId,
      hasBody,
      bodyId,
      trigger,
      closeOnEsc,
      onClose,
      isOpen,
      closeOnBlur,
      closeDelay,
      arrowShadowColor,
      arrowSize,
    ],
  )

  const getPopoverPositionerProps: PropGetter = useCallback(
    (props = {}, forwardedRef = null) =>
      getPopperProps(
        {
          ...props,
          style: {
            visibility: isOpen ? "visible" : "hidden",
            ...props.style,
          },
        },
        forwardedRef,
      ),
    [isOpen, getPopperProps],
  )

  const getAnchorProps: PropGetter = useCallback(
    (props, _ref = null) => {
      const anchorProps: HTMLProps = {
        ...props,
        // If anchor is rendered, it is used as reference.
        ref: mergeRefs(_ref, anchorRef, referenceRef),
      }

      return anchorProps
    },
    [anchorRef, referenceRef],
  )

  const openTimeout = useRef<number>()
  const closeTimeout = useRef<number>()

  const maybeReferenceRef = useCallback(
    (node: Element) => {
      // Don't override referenceRef in case the PopoverAnchor is rendered.
      if (anchorRef.current == null) {
        referenceRef(node)
      }
    },
    [referenceRef],
  )

  const getTriggerProps: PropGetter = useCallback(
    (props = {}, _ref = null) => {
      const triggerProps: HTMLProps = {
        ...props,
        ref: mergeRefs(triggerRef, _ref, maybeReferenceRef),
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
        triggerProps.onBlur = callAllHandlers(props.onBlur, (event) => {
          const relatedTarget = getRelatedTarget(event)
          const isValidBlur = !contains(popoverRef.current, relatedTarget)

          if (isOpen && closeOnBlur && isValidBlur) {
            onClose()
          }
        })

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
      maybeReferenceRef,
      onToggle,
      onOpen,
      closeOnBlur,
      onClose,
      openDelay,
      closeDelay,
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

  const getHeaderProps: PropGetter = useCallback(
    (props = {}, ref = null) => ({
      ...props,
      id: headerId,
      ref: mergeRefs(ref, (node: HTMLElement | null) => {
        setHasHeader(!!node)
      }),
    }),
    [headerId],
  )

  const getBodyProps: PropGetter = useCallback(
    (props = {}, ref = null) => ({
      ...props,
      id: bodyId,
      ref: mergeRefs(ref, (node) => {
        setHasBody(!!node)
      }),
    }),
    [bodyId],
  )

  return {
    forceUpdate,
    isOpen,
    onClose,
    getAnchorProps,
    getArrowProps,
    getArrowInnerProps,
    getPopoverPositionerProps,
    getPopoverProps,
    getTriggerProps,
    getHeaderProps,
    getBodyProps,
  }
}

export type UsePopoverReturn = ReturnType<typeof usePopover>
