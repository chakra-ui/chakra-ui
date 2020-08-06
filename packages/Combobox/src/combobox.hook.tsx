import { useClickable } from "@chakra-ui/clickable"
import { useDescendant, useDescendants } from "@chakra-ui/descendant"
import { useDisclosure, useId, useIds, useUpdateEffect } from "@chakra-ui/hooks"
import { UsePopperProps } from "@chakra-ui/popper"
import {
  callAllHandlers,
  createOnKeyDown,
  getNextIndex,
  //getNextItemFromSearch,
  getPrevIndex,
  focus,
  createContext,
} from "@chakra-ui/utils"
import { InputProps } from "@chakra-ui/input"
import * as React from "react"

const [ComboboxContextProvider, useComboboxContext] = createContext<
  UseComboboxReturn
>({
  strict: false,
  name: "ComboboxContext",
})

export { ComboboxContextProvider, useComboboxContext }

export interface UseComboboxProps extends UsePopperProps {
  /**
   * Unique id to be used by the combobox and it's children
   */
  id?: string

  /**
   * If `true`, it will select the clicked item
   *
   * @default true
   */
  selectTextOnClick?: boolean

  /**
   * If `true`, it will render the loading icon in
   * the combobox-input
   * @default true
   */
  isLoading?: boolean

  /**
   * If `true`, it will open the list when the combobox-input
   * onFocus event is fired
   * @default true
   */
  openOnFocus?: boolean

  /**
   * Callback that is fired everytime the highlighted
   * item is changed
   */

  onHighlight?: (highlightedValue: number) => void

  /**
   * Callback that is fired everytime the selected
   * item is changed
   */
  onSelect?: (selectedValue: number) => void

  /**
   * Callback that is fired everytime
   * a key is pressed
   */

  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
}

/**
 * React Hook to manage a combobox
 *
 * It provides the logic and will be used with react context
 * to propagate it's return value to all children
 */
export function useCombobox(props: UseComboboxProps) {
  const {
    id,
    selectTextOnClick = true,
    openOnFocus = true,
    isLoading = false,
    onHighlight,
    onSelect,
    onKeyDown: onKeyDownProp,
  } = props

  const [inputValue, setInputValue] = React.useState("")

  /**
   * Highlighted value
   */
  const [focusedIndex, setFocusedIndex] = React.useState<number>(-1)

  /**
   * Selected value
   */
  const [selectedIndex, setSelectedIndex] = React.useState<number>(-1)

  const menuRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const { isOpen, onOpen: openMenu, onClose: closeMenu } = useDisclosure()

  /**
   * Context to register all menu items
   */
  const domContext = useDescendants<HTMLDivElement, any>()

  const { descendants } = domContext

  /**
   * Call onHighlight callback
   */
  React.useEffect(() => {
    if (onHighlight && focusedIndex != null) {
      onHighlight(focusedIndex)
    }
  }, [onHighlight, focusedIndex])

  /**
   * Reset the focused index if the menu is closed
   */
  React.useEffect(() => {
    if (!isOpen) {
      setFocusedIndex(-1)
    }
  }, [isOpen])

  /**
   * Clear input
   */

  const clearValue = React.useCallback(() => {
    if (selectedIndex === -1) {
      setInputValue("")
    } else {
      setInputValue(descendants[selectedIndex].element.textContent)
    }
    closeMenu()
  }, [closeMenu, selectedIndex, descendants])

  /**
   * Change the input value to the
   * selected item text content
   */
  const selectValue = React.useCallback(
    (clickedIndex?: number) => {
      if (clickedIndex !== undefined) {
        setSelectedIndex(clickedIndex)
        setInputValue(descendants[clickedIndex].element.textContent)
        closeMenu()
      } else {
        if (focusedIndex === -1) {
        } else {
          setSelectedIndex(focusedIndex)
          setInputValue(descendants[focusedIndex].element.textContent)
          closeMenu()
        }
      }
    },
    [focusedIndex, descendants],
  )

  /**
   * Generate unique ids for autocomplete menu and input
   */
  const [menuId, inputId] = useIds(id, `combobox-list`, `combobox-input`)

  const onKeyDown = React.useMemo(
    () =>
      createOnKeyDown({
        keyMap: {
          ArrowDown: () => {
            const nextIndex = getNextIndex(focusedIndex, descendants.length)
            setFocusedIndex(nextIndex)
          },
          ArrowUp: () => {
            const prevIndex = getPrevIndex(focusedIndex, descendants.length)
            setFocusedIndex(prevIndex)
          },
          Escape: clearValue,
          Enter: () => {
            selectValue()
            closeMenu()
            if (onSelect && focusedIndex) {
              onSelect(descendants[focusedIndex])
            }
          },
        },
      }),
    [clearValue, closeMenu, focusedIndex, onSelect, selectValue],
  )

  return {
    isOpen,
    isLoading,
    domContext,
    menuRef,
    inputRef,
    openOnFocus,
    onSelect,
    clearValue,
    selectValue,
    inputId,
    inputValue,
    selectTextOnClick,
    menuId,
    focusedIndex,
    setFocusedIndex,
    selectedIndex,
    setSelectedIndex,
    openMenu,
    closeMenu,
    setInputValue,
    onKeyDown: callAllHandlers(onKeyDownProp, onKeyDown),
  }
}

/**
 * Return type for the Higher component in the tree `useCombobox`
 */
export interface UseComboboxReturn extends ReturnType<typeof useCombobox> {}

/**
 * React Hook to manage a combobox input.
 *
 * The assumption here is that the `useCombobox` hook is used
 * in a component higher up the tree, and it's return value
 * is passed as `context` to this hook.
 */
export interface UseComboboxInputProps extends InputProps {
  onFocus?: React.FocusEventHandler<HTMLInputElement>
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onClick?: React.MouseEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  value?: string
  ref: React.Ref<any>
}

export function useComboboxInput(props: UseComboboxInputProps) {
  const comboboxCtx = useComboboxContext()
  const {
    onChange: onChangeProp,
    value: valueProp,
    onFocus: onFocusProp,
    ref,
    isInvalid,
  } = props

  const {
    inputValue,
    setInputValue,
    inputId,
    menuId,
    isOpen,
    focusedIndex,
    setFocusedIndex,
    inputRef,
    closeMenu,
    onKeyDown,
    selectValue,
    menuRef,
    openOnFocus,
    openMenu,
    domContext,
  } = comboboxCtx

  const onBlur = React.useCallback(() => {
    if (!menuRef.current) return
    requestAnimationFrame(() => {
      const isFocusWithin = menuRef.current?.contains(document.activeElement)
      if (!isFocusWithin) {
        closeMenu()
      }
    })
  }, [menuRef, selectValue, closeMenu])

  const onFocus = React.useCallback(() => {
    if (openOnFocus) {
      openMenu()
    }
  }, [openOnFocus, openMenu])

  const onChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value)
      if (!isOpen) {
        openMenu()
      }
      if (event.target.value.trim() === "") {
        closeMenu()
      }
    },
    [setFocusedIndex, setInputValue, isOpen, openMenu, closeMenu],
  )

  return {
    ref: inputRef,
    type: "text",
    role: "combobox",
    "aria-activedescendant":
      focusedIndex !== -1
        ? String(makeHash(domContext.descendants[focusedIndex].value))
        : undefined,
    "aria-owns": menuId,
    "aria-expanded": isOpen && domContext.descendants.length > 0,
    "aria-invalid": isInvalid,
    autoComplete: "off",
    autoCorrect: "off",
    id: inputId,
    onChange: callAllHandlers(onChangeProp, onChange),
    onFocus: callAllHandlers(onFocusProp, onFocus),
    onKeyDown,
    onBlur,
    value: valueProp ? valueProp : inputValue,
  }
}

/**
 * React Hook to manage a combobox menu.
 *
 * The assumption here is that the `useCombobox` hook is used
 * in a component higher up the tree, and it's return value
 * is passed as `context` to this hook.
 */

export interface UseComboboxListProps {
  onMouseEnter?: React.MouseEventHandler
  onBlur?: React.FocusEventHandler
  onKeyDown?: React.KeyboardEventHandler
  style?: React.CSSProperties
  className?: string
  hidden?: boolean
  children?: React.ReactNode
  ref: React.Ref<any>
}

export function useComboboxList(props: UseComboboxListProps) {
  const comboboxCtx = useComboboxContext()
  const { isOpen, menuId, menuRef, onKeyDown } = comboboxCtx

  return {
    ref: menuRef,
    id: menuId,
    role: "listbox",
    hidden: !isOpen,
    onKeyDown,
    children: props.children,
  }
}

/**
 * React Hook to manage a menu item.
 *
 * The assumption here is that the `useMenu` hook is used
 * in a component higher up the tree, and it's return value
 * is passed as `context` to this hook.
 */

export interface UseComboboxListItemProps {
  value: string
  isDisabled?: boolean
  isFocusable?: boolean
  isVisible: boolean
  children?: React.ReactNode
}

export function useComboboxListItem(props: UseComboboxListItemProps) {
  const combobox = useComboboxContext()
  const { value, isDisabled, isFocusable, children, ...htmlProps } = props
  const {
    domContext,
    setFocusedIndex,
    focusedIndex,
    menuRef,
    selectTextOnClick,
    selectValue,
  } = combobox

  const ref = React.useRef<HTMLDivElement>(null)
  const id = `menuitem-${useId()}`

  /**
   * Register the menuitem's node into the domContext
   */
  const index = useDescendant({
    id,
    element: ref.current,
    value: value,
    label: ref.current?.textContent,
    context: domContext,
    disabled: isDisabled,
    focusable: isFocusable,
  })

  const onClick = React.useCallback(
    (event: React.MouseEvent) => {
      setFocusedIndex(index)
      if (selectTextOnClick) {
        selectValue(index)
      }
    },
    [selectTextOnClick, selectValue, index, setFocusedIndex],
  )

  const isFocused = index === focusedIndex

  const trulyDisabled = isDisabled && !isFocusable

  useUpdateEffect(() => {
    if (isFocused && !trulyDisabled) {
      if (ref.current) {
        focus(ref.current)
      }
    } else {
      if (document.activeElement !== menuRef.current) {
        menuRef.current?.focus()
      }
    }
  }, [isFocused, trulyDisabled, menuRef])

  const tabbable = useClickable({
    onClick,
    ref,
    isDisabled,
    isFocusable,
  })
  return {
    ...htmlProps,
    ...tabbable,
    id,
    role: "option",
    tabIndex: isFocused ? 0 : -1,
    "aria-selected": isFocused ? true : undefined,
    "data-selected": isFocused ? "" : undefined,
    children,
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
