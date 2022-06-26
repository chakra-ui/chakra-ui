import { useMergeRefs } from "@chakra-ui/react"
import { useFocusOnHide } from "@chakra-ui/hooks"
import React, { KeyboardEvent, useMemo } from "react"
import { SelectKeyboardKey } from "../enums/select.enum"
import { useSelectContext } from "../select.component"

interface UseSelectTriggerProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  forwardRef?: React.ForwardedRef<HTMLButtonElement>
}

const useSelectTrigger = ({ onClick, forwardRef }: UseSelectTriggerProps) => {
  const ref = React.useRef<HTMLButtonElement>(null)
  const {
    isOpen,
    onOpen,
    onClose,
    isDisabled,
    activeIndex,
    onNextOption,
    onPrevOption,
    onToggle,
  } = useSelectContext()

  useFocusOnHide(ref, {
    focusRef: ref,
    visible: isOpen,
    shouldFocus: activeIndex !== undefined,
  })

  const keyActions: Record<string, () => void | undefined> = useMemo(
    () => ({
      [SelectKeyboardKey.ArrowUp]: onPrevOption,
      [SelectKeyboardKey.ArrowDown]: onNextOption,
      [SelectKeyboardKey.Escape]: onClose,
      [SelectKeyboardKey.Enter]: onToggle,
      [SelectKeyboardKey.Space]: onToggle,
    }),
    [onClose, onNextOption, onPrevOption, onToggle],
  )

  const onKeyUp = (event: KeyboardEvent) => {
    const action = keyActions[event.key]
    console.log(event.key)

    if (action) {
      event.preventDefault()
      action()
    }
  }

  const onKeyDown = (event: KeyboardEvent) => {
    if (isOpen) event.preventDefault()
  }

  const onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isOpen) onClose()
    else onOpen()

    onClick?.(event)
  }

  return {
    ref: useMergeRefs(forwardRef, ref),
    type: "button" as "button",
    role: "button",
    disabled: isDisabled,
    "aria-haspopup": "listbox" as "listbox",
    "aria-expanded": isOpen,
    onKeyUp,
    onKeyDown,
    onClick: onButtonClick,
  }
}

export default useSelectTrigger
