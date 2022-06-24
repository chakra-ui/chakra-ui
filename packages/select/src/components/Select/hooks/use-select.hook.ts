import React, { useCallback } from "react"
import { useControllableState, useIds } from "@chakra-ui/react"
import {
  SelectControlProps,
  SelectOption,
  SelectRenderProps,
  SelectValue,
} from "../interfaces/select.interface"

export type UseSelectProps = SelectControlProps & SelectRenderProps

const useSelect = ({
  isOpen,
  value: currentValue,
  defaultValue,
  onChange,
  onOpen,
  onClose,
  closeOnSelect = true,
  ...restProps
}: UseSelectProps) => {
  const [open, setOpen] = React.useState<boolean>()
  const [option, setOption] = React.useState<SelectOption>()
  const [value, setValue] = useControllableState<SelectValue>({
    value: currentValue,
    defaultValue,
    onChange,
  })

  const [options, setOptions] = React.useState<Set<SelectOption>>(
    new Set<SelectOption>(),
  )
  const [activeIndex, setActiveIndex] = React.useState<number>(-1)

  const [selectId] = useIds(restProps.id, "chakra-select")

  const activeIndexKey = React.useMemo(() => {
    if (activeIndex < 0) {
      return
    }

    return `chakra-select__option-${activeIndex}`
  }, [activeIndex])

  const isOpenStatus = React.useMemo(() => {
    return open && !restProps.isDisabled
  }, [open, restProps.isDisabled])

  React.useEffect(() => {
    setOpen(isOpen)
  }, [isOpen, setOpen])

  const onSelectOpen = () => {
    setOpen(true)
    onOpen?.()
  }

  const onSelectClose = useCallback(() => {
    setOpen(false)
    setActiveIndex(-1)
    onClose?.()
  }, [onClose])

  const onOptionChange = React.useCallback(
    (newOption: SelectOption) => {
      setOption(newOption)
      setValue(newOption.value)

      if (closeOnSelect) onSelectClose()
    },
    [setValue, closeOnSelect, onSelectClose],
  )

  const addOption = React.useCallback(
    (option: SelectOption) => {
      setOptions((options) => new Set(options).add(option))
    },
    [setOptions],
  )

  const removeOption = React.useCallback(
    (option: SelectOption) => {
      setOptions((options) => {
        const newOptions = new Set(options)
        newOptions.delete(option)
        return newOptions
      })
    },
    [setOptions],
  )

  const onNextOption = () => {
    if (options.size - 1 > activeIndex) {
      setActiveIndex((prevIndex) => prevIndex + 1)

      return
    }

    setActiveIndex(0)
  }

  const onPrevOption = () => {
    if (activeIndex > 0) {
      setActiveIndex((prevIndex) => prevIndex - 1)

      return
    }

    setActiveIndex(options.size - 1)
  }

  const onToggle = () => {
    if (isOpen) onSelectClose()
    else onSelectOpen()
  }

  return {
    selectId,
    isOpen: isOpenStatus,
    activeIndex,
    activeIndexKey,
    setActiveIndex,
    value,
    option,
    options,
    onOpen: onSelectOpen,
    onClose: onSelectClose,
    setOption: onOptionChange,
    addOption,
    removeOption,
    onNextOption,
    onPrevOption,
    onToggle,
    ...restProps,
  }
}

export type UseSelectReturn = ReturnType<typeof useSelect>

export default useSelect
