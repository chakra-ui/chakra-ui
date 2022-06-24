import { usePrevious } from "@chakra-ui/react"
import React, { KeyboardEvent } from "react"
import { SelectOption } from "../interfaces/select.interface"
import { SelectKeyboardKey } from "../enums/select.enum"
import { useSelectContext } from "../select.component"

const useSelectOption = (option: SelectOption) => {
  const {
    selectId,
    value,
    activeIndex,
    setActiveIndex,
    setOption,
    options,
    onClose,
    addOption,
    updateOption,
  } = useSelectContext()
  const ref = React.createRef<HTMLLIElement>()
  const prevOption = usePrevious(option)

  const isSelected = React.useMemo(
    () => value === option.value,
    [value, option.value],
  )

  const index = React.useMemo(() => {
    return options.findIndex((item) => item.value === option.value)
  }, [options, option])

  React.useEffect(() => {
    if (!prevOption) {
      addOption(option)
    } else if (prevOption.value !== option.value) {
      updateOption(option, prevOption)
    }
  }, [prevOption, option, addOption, updateOption])

  React.useEffect(() => {
    if (isSelected) {
      setOption(option)
    }
  }, [isSelected, option, setOption])

  React.useEffect(() => {
    if (activeIndex !== -1 && activeIndex === index) {
      ref.current?.focus()
    }
  }, [activeIndex, index, ref])

  const onClick = React.useCallback(() => {
    setOption(option)
    setActiveIndex(index)
  }, [option, setOption, index, setActiveIndex])

  const onKeyUp = (event: KeyboardEvent) => {
    event.preventDefault()

    if (event.key === SelectKeyboardKey.Enter) setOption(option)
    if (event.key === SelectKeyboardKey.Escape) onClose()
  }

  const onKeyDown = (event: KeyboardEvent) => {
    event.preventDefault()
  }

  return {
    ref,
    id: `${selectId}-option-${index}`,
    tabIndex: activeIndex === index ? 0 : -1,
    isSelected,
    role: "option",
    "aria-selected": isSelected,
    onClick,
    onKeyUp,
    onKeyDown,
  }
}

export default useSelectOption
