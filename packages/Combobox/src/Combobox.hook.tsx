import { useDescendant, useDescendants } from "@chakra-ui/descendant"
import { useDisclosure, useId } from "@chakra-ui/hooks"
import { callAllHandlers, createOnKeyDown } from "@chakra-ui/utils"
import * as React from "react"

export interface ComboboxHookProps {
  id?: string
  onHighlight?: (highlightedValue: string) => void
  onSelect?: (selectedValue: string) => void
  autoHighlight?: boolean
  selectTextOnClick?: boolean
  selectOnBlur?: boolean
  openOnFocus?: () => string
  autoComplete?: boolean
}

export function useCombobox(props: ComboboxHookProps) {
  const {
    id: idProp,
    onHighlight,
    onSelect,
    autoHighlight = false,
    selectTextOnClick = false,
    selectOnBlur = false,
    openOnFocus,
    autoComplete = true,
  } = props

  const [inputValue, setInputValue] = React.useState("")
  const [focusedValue, setFocusedValue] = React.useState<string | null>(null)

  const inputRef = React.useRef<HTMLInputElement>(null)
  const menuRef = React.useRef<HTMLDivElement>(null)

  const { isOpen, onOpen: openMenu, onClose: closeMenu } = useDisclosure()

  const descendantsContext = useDescendants<
    HTMLDivElement,
    { value: string; id: string }
  >()

  const { descendants } = descendantsContext

  React.useEffect(() => {
    if (onHighlight && focusedValue != null) {
      onHighlight(focusedValue)
    }
  }, [onHighlight, focusedValue])

  React.useEffect(() => {
    if (autoHighlight && descendants.length && isOpen) {
      setFocusedValue(descendants[0].value)
    }
  }, [autoHighlight, descendants, isOpen, inputValue])

  const uuid = useId()
  const id = idProp || uuid

  const menuId = `chakra-menu-` + id
  const inputId = `chakra-input-` + id

  const focusPrevOption = React.useCallback(() => {
    if (!descendants.length) return

    const index = descendants.findIndex(item => item.value === focusedValue)

    const isAtFirstOption = index === 0

    if (index === -1) {
      const lastOption = descendants[descendants.length - 1]
      setFocusedValue(lastOption.value)
    } else {
      if (isAtFirstOption && autoComplete) {
        setFocusedValue(null)
      } else {
        const nextOption =
          descendants[(index - 1 + descendants.length) % descendants.length]
        setFocusedValue(nextOption.value)
      }
    }
  }, [autoComplete, descendants, focusedValue])

  const focusNextOption = React.useCallback(() => {
    if (!descendants.length) return

    const index = descendants.findIndex(item => item.value === focusedValue)

    const isAtLastOption = index === descendants.length - 1

    if (index === -1) {
      const firstOption = descendants[0]
      setFocusedValue(firstOption.value)
    } else {
      if (isAtLastOption && autoComplete) {
        setFocusedValue(null)
      } else {
        const nextOption = descendants[(index + 1) % descendants.length]
        setFocusedValue(nextOption.value)
      }
    }
  }, [descendants, autoComplete, focusedValue])

  const clearValue = React.useCallback(() => {
    setInputValue("")
    setFocusedValue(null)
    closeMenu()
  }, [closeMenu])

  const selectValue = React.useCallback(() => {
    if (focusedValue == null) return
    setInputValue(focusedValue)
    setFocusedValue(null)
  }, [focusedValue])

  return {
    isOpen,
    descendantsContext,
    menuRef,
    inputRef,
    openOnFocus,
    focusNextOption,
    focusPrevOption,
    onSelect,
    clearValue,
    selectValue,
    selectOnBlur,
    inputId,
    inputValue,
    selectTextOnClick,
    menuId,
    autoComplete,
    focusedValue,
    openMenu,
    closeMenu,
    setInputValue,
    setFocusedValue,
  }
}

type ComboboxHookReturn = ReturnType<typeof useCombobox>

interface ComboBoxInputHookProps {
  context: ComboboxHookReturn
  onFocus?: React.FocusEventHandler<HTMLInputElement>
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
  onClick?: React.MouseEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  value?: string
}

export function useComboboxInput(props: ComboBoxInputHookProps) {
  const {
    context,
    onChange: onChangeProp,
    value: valueProp,
    onKeyDown: onKeyDownProp,
    onFocus: onFocusProp,
  } = props

  const {
    inputValue,
    setInputValue,
    inputId,
    menuId,
    isOpen,
    focusedValue,
    autoComplete,
    selectTextOnClick,
    inputRef,
    clearValue,
    closeMenu,
    focusNextOption,
    focusPrevOption,
    onSelect,
    selectValue,
    selectOnBlur,
    menuRef,
    setFocusedValue,
    openOnFocus,
    openMenu,
    descendantsContext,
  } = context

  const onClick = React.useCallback(() => {
    if (selectTextOnClick) {
      inputRef.current?.select()
    }
  }, [selectTextOnClick, inputRef])

  const onKeyDown = React.useMemo(
    () =>
      createOnKeyDown({
        keyMap: {
          ArrowDown: focusNextOption,
          ArrowUp: focusPrevOption,
          Escape: clearValue,
          Enter: () => {
            selectValue()
            closeMenu()
            if (onSelect && focusedValue) {
              onSelect(focusedValue)
            }
          },
        },
      }),
    [
      clearValue,
      closeMenu,
      focusNextOption,
      focusPrevOption,
      focusedValue,
      onSelect,
      selectValue,
    ],
  )

  const onBlur = React.useCallback(() => {
    if (!menuRef.current) return
    requestAnimationFrame(() => {
      const isFocusWithin = menuRef.current?.contains(document.activeElement)
      if (!isFocusWithin) {
        selectOnBlur && selectValue()
        closeMenu()
      }
    })
  }, [menuRef, selectOnBlur, selectValue, closeMenu])

  const onFocus = React.useCallback(() => {
    if (openOnFocus) {
      openMenu()
    }
  }, [openOnFocus, openMenu])

  const onChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFocusedValue(null)
      setInputValue(event.target.value)
      if (!isOpen) {
        openMenu()
      }
      if (event.target.value.trim() === "") {
        closeMenu()
      }
    },
    [setFocusedValue, setInputValue, isOpen, openMenu, closeMenu],
  )

  return {
    type: "text",
    role: "combobox",
    "aria-activedescendant": focusedValue
      ? String(makeHash(focusedValue))
      : undefined,
    "aria-autocomplete": (autoComplete
      ? "both"
      : "list") as React.AriaAttributes["aria-autocomplete"],
    "aria-owns": menuId,
    "aria-expanded": isOpen && descendantsContext.descendants.length > 0,
    autoComplete: "off",
    autoCorrect: "off",
    ref: inputRef,
    id: inputId,
    onChange: callAllHandlers(onChangeProp, onChange),
    onFocus: callAllHandlers(onFocusProp, onFocus),
    onKeyDown: callAllHandlers(onKeyDownProp, onKeyDown),
    onClick,
    onBlur,
    value: autoComplete
      ? focusedValue || valueProp || inputValue
      : valueProp || inputValue,
  }
}

export type ComboboxMenuHookProps = { context: ComboboxHookReturn }

export function useComboboxMenu(props: ComboboxMenuHookProps) {
  const { menuId, isOpen, menuRef } = props.context

  return {
    ref: menuRef,
    id: menuId,
    role: "listbox",
    hidden: !isOpen,
  }
}

export interface ComboboxOptionHookProps {
  context: ComboboxHookReturn
  value: string
}

export function useComboboxOption({ context, value }: ComboboxOptionHookProps) {
  const {
    descendantsContext,
    focusedValue,
    setFocusedValue,
    setInputValue,
    closeMenu,
    inputRef,
    selectTextOnClick,
  } = context

  const ref = React.useRef<HTMLDivElement>(null)
  const id = String(makeHash(value))

  const onMouseOver = React.useCallback(() => {
    setFocusedValue(value)
  }, [setFocusedValue, value])

  const onMouseOut = React.useCallback(() => {
    setFocusedValue(null)
  }, [setFocusedValue])

  const onClick = React.useCallback(() => {
    if (focusedValue) {
      setInputValue(focusedValue)
    }
    closeMenu()
    requestAnimationFrame(() => {
      if (selectTextOnClick) {
        inputRef.current?.select()
      } else {
        inputRef.current?.focus()
      }
    })
  }, [focusedValue, setInputValue, closeMenu, selectTextOnClick, inputRef])

  useDescendant({
    context: descendantsContext,
    value: value,
    element: ref.current,
    id,
  })

  const isFocused = focusedValue === value

  return {
    id,
    ref,
    onMouseOver,
    onMouseOut,
    onClick,
    role: "option",
    tabIndex: -1,
    "aria-selected": isFocused ? true : undefined,
    "data-selected": isFocused ? "" : undefined,
  }
}

export function useComboboxButton({
  context,
}: {
  context: ComboboxHookReturn
}) {
  return {
    tabindex: -1,
    type: "button",
    role: "button",
    "aria-haspopup": true,
  }
}

function makeHash(str: string) {
  let hash = 0
  if (str.length === 0) {
    return hash
  }
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return hash
}
