import { useDisclosure, useIds } from "@chakra-ui/hooks"
import { Placement, usePopper } from "@chakra-ui/popper"
import * as React from "react"
import { useBlurOutside, useFocusOnHide, useFocusOnShow } from "./Popover.utils"
import { mergeRefs } from "@chakra-ui/utils"

export interface PopoverHookProps {
  id?: string
  isOpen?: boolean
  defaultIsOpen?: boolean
  initialFocusRef?: React.RefObject<any>
  returnFocusOnClose?: boolean
  gutter?: number
  placement?: Placement
  closeOnBlur?: boolean
  closeOnEsc?: boolean
  onOpen?: () => void
  onClose?: () => void
}

export function usePopover(props: PopoverHookProps = {}) {
  const {
    closeOnBlur = true,
    closeOnEsc = true,
    initialFocusRef,
    placement,
    gutter,
    id,
  } = props
  const { isOpen, onClose, onToggle } = useDisclosure(props)

  const triggerRef = React.useRef<any>(null)
  const contentRef = React.useRef<any>(null)

  const [triggerId, popoverId] = useIds(
    id,
    "popover-trigger",
    "popover-content",
  )

  const { popper, reference } = usePopper({
    placement,
    gutter,
    forceUpdate: isOpen,
  })

  useFocusOnHide(contentRef, {
    autoFocus: true,
    visible: isOpen,
    focusRef: triggerRef,
  })

  useFocusOnShow(contentRef, {
    autoFocus: true,
    visible: isOpen,
    focusRef: initialFocusRef,
  })

  const onBlur = useBlurOutside(triggerRef, contentRef, {
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
    trigger: {
      id: triggerId,
      ref: mergeRefs(triggerRef, reference.ref),
      "aria-haspopup": "dialog" as React.AriaAttributes["aria-haspopup"],
      "aria-expanded": isOpen,
      "aria-controls": popoverId,
      onClick: onToggle,
    },
    popover: {
      id: popoverId,
      tabIndex: -1,
      hidden: !isOpen,
      ref: mergeRefs(contentRef, popper.ref),
      style: popper.style,
      "aria-hidden": isOpen ? undefined : true,
      role: "dialog",
      onBlur: onBlur,
      onKeyDown,
    },
  }
}

export type PopoverHookReturn = ReturnType<typeof usePopover>
