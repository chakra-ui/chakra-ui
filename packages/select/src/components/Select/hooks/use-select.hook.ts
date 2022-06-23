import React, { useCallback } from "react"
import { useIds, usePrevious } from "@chakra-ui/react"
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
  const [value, setValue] = React.useState<SelectValue>()

  const [options, setOptions] = React.useState<SelectOption[]>([])
  const [activeIndex, setActiveIndex] = React.useState<number>(-1)

  const prevValue = usePrevious(value)

  const [selectId] = useIds(restProps.id, "chakra-select")

  const activeIndexKey = React.useMemo(() => {
    if (activeIndex < 0) {
      return
    }

    return `chakra-select-option-${activeIndex}`
  }, [activeIndex])

  const isOpenStatus = React.useMemo(() => {
    return open && !restProps.isDisabled
  }, [open, restProps.isDisabled])

  React.useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  React.useEffect(() => {
    if (prevValue === value && currentValue !== value) {
      setValue(currentValue)
    }
  }, [value, prevValue, currentValue])

  React.useEffect(() => {
    setOpen(isOpen)
  }, [isOpen, setOpen])

  const onSelectOpen = () => {
    setOpen(true)
    onOpen?.()
  }

  const onSelectClose = useCallback(() => {
    setOpen(false)
    setOptions([])
    setActiveIndex(-1)
    onClose?.()
  }, [onClose])

  const onValueChange = React.useCallback(
    (newValue: SelectValue) => {
      if (value !== newValue) {
        onChange?.(newValue)
        setValue(newValue)
      }
    },
    [value, setValue, onChange],
  )

  const onOptionChange = React.useCallback(
    (newOption: SelectOption) => {
      if (newOption.value !== value) {
        setOption(newOption)
        onValueChange(newOption.value)

        if (closeOnSelect) onSelectClose()
      }
    },
    [value, onValueChange, closeOnSelect, onSelectClose],
  )

  const addOption = React.useCallback(
    (option: SelectOption) => {
      setOptions((prevState) => [...prevState, option])
    },
    [setOptions],
  )

  const updateOption = React.useCallback(
    (newOption: SelectOption, prevOption: SelectOption) => {
      setOptions((prevState) => [
        ...prevState.map((item) => {
          if (item.value === prevOption.value) {
            return newOption
          }

          return item
        }),
      ])
    },
    [setOptions],
  )

  const onNextOption = () => {
    if (options.length - 1 > activeIndex) {
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

    setActiveIndex(options.length - 1)
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
    onChange: onValueChange,
    setOption: onOptionChange,
    addOption,
    updateOption,
    onNextOption,
    onPrevOption,
    onToggle,
    ...restProps,
  }
}

export type UseSelectReturn = ReturnType<typeof useSelect>

export default useSelect
