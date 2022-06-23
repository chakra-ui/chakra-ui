import { ButtonProps, useMergeRefs } from "@chakra-ui/react"
import React, { KeyboardEvent, LegacyRef, useMemo } from "react"
import { SelectKeyboardKey } from "../enums/select.enum"
import { useSelectContext } from "../select.component"

interface UseSelectButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  forwardRef?: React.ForwardedRef<HTMLButtonElement>
}

interface UseSelectButtonReturn extends ButtonProps {
  ref?: LegacyRef<HTMLButtonElement>
}

const useSelectButton = ({
  onClick,
  forwardRef,
}: UseSelectButtonProps): UseSelectButtonReturn => {
  const ref = React.createRef<HTMLButtonElement>()
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

  React.useEffect(() => {
    if (!isOpen || activeIndex === undefined) {
      ref.current?.focus()
    }
  }, [isOpen, activeIndex, ref])

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
    event.preventDefault()

    const action = keyActions[event.key]
    if (action) action()
  }

  const onKeyDown = (event: KeyboardEvent) => {
    event.preventDefault()
  }

  const onBlur = () => {
    // onClose();
  }

  const onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isOpen) onClose()
    else onOpen()

    onClick?.(event)
  }

  return {
    ref: useMergeRefs(forwardRef, ref),
    type: "button",
    role: "button",
    disabled: isDisabled,
    "aria-haspopup": "listbox",
    "aria-expanded": isOpen,
    onKeyUp,
    onKeyDown,
    onClick: onButtonClick,
    onBlur,
  }
}

export default useSelectButton
