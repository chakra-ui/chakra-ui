import { useDisclosure, useIds, useBooleanState } from "@chakra-ui/hooks"
import { Placement, usePopper } from "@chakra-ui/popper"
import * as React from "react"
import { useBlurOutside, useFocusOnHide, useFocusOnShow } from "./Popover.utils"
import { mergeRefs, Dict, callAllHandlers } from "@chakra-ui/utils"

export interface PopoverHookProps {
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
  initialFocusRef?: React.RefObject<any>
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
}

export function usePopover(props: PopoverHookProps = {}) {
  const {
    closeOnBlur = true,
    closeOnEsc = true,
    initialFocusRef,
    placement,
    gutter,
    id,
    arrowSize,
  } = props

  const { isOpen, onClose, onToggle } = useDisclosure(props)

  const triggerRef = React.useRef<any>(null)
  const popoverRef = React.useRef<any>(null)

  const [hasHeader, setHasHeader] = useBooleanState()
  const [hasBody, setHasBody] = useBooleanState()

  const [triggerId, popoverId, headerId, bodyId] = useIds(
    id,
    "popover-trigger",
    "popover-content",
    "popover-header",
    "popover-body",
  )

  const { popper, reference, arrow } = usePopper({
    placement,
    gutter,
    forceUpdate: isOpen,
    arrowSize,
  })

  useFocusOnHide(popoverRef, {
    autoFocus: true,
    visible: isOpen,
    focusRef: triggerRef,
  })

  useFocusOnShow(popoverRef, {
    autoFocus: true,
    visible: isOpen,
    focusRef: initialFocusRef,
  })

  const onBlur = useBlurOutside(triggerRef, popoverRef, {
    visible: Boolean(closeOnBlur && isOpen),
    action: onClose,
  })

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (closeOnEsc && event.key === "Escape") {
        onClose()
      }
    },
    [closeOnEsc, onClose],
  )

  return {
    isOpen,
    onClose,
    headerId,
    hasHeader,
    setHasHeader,
    bodyId,
    hasBody,
    setHasBody,
    getArrowProps: (props: Dict = {}) => ({
      ...props,
      ref: mergeRefs(arrow.ref, props.ref),
      style: { ...props.style, ...arrow.style },
    }),
    getTriggerProps: (props: Dict = {}) => ({
      ...props,
      id: triggerId,
      ref: mergeRefs(triggerRef, reference.ref, props.ref),
      "aria-haspopup": "dialog" as React.AriaAttributes["aria-haspopup"],
      "aria-expanded": isOpen,
      "aria-controls": popoverId,
      onClick: callAllHandlers(props.onClick, onToggle),
    }),
    getPopoverProps: (props: Dict = {}) => ({
      ...props,
      id: popoverId,
      tabIndex: -1,
      hidden: !isOpen,
      ref: mergeRefs(popoverRef, popper.ref, props.ref),
      style: { ...props.style, ...popper.style },
      "aria-hidden": isOpen ? undefined : true,
      role: "dialog",
      onBlur: callAllHandlers(props.onBlur, onBlur),
      onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
      "aria-labelledby": hasHeader ? headerId : undefined,
      "aria-describedby": hasBody ? bodyId : undefined,
    }),
  }
}

export type PopoverHookReturn = ReturnType<typeof usePopover>
