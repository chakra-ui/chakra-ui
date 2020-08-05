import { useClickable } from "@chakra-ui/clickable"
import { useDescendant, useDescendants } from "@chakra-ui/descendant"
import {
  useControllableState,
  useDisclosure,
  useId,
  useIds,
  useShortcut,
  useUpdateEffect,
} from "@chakra-ui/hooks"
import { usePopper, UsePopperProps } from "@chakra-ui/popper"
import {
  addItem,
  callAllHandlers,
  createContext,
  createOnKeyDown,
  cx,
  dataAttr,
  focus,
  getNextIndex,
  getNextItemFromSearch,
  getPrevIndex,
  getValidChildren,
  isArray,
  isString,
  mergeRefs,
  removeItem,
} from "@chakra-ui/utils"
import { useInteractOutside } from "@react-aria/interactions"
import React, {
  useCallback,
  useState,
  HTMLAttributes,
  useRef,
  cloneElement,
  MouseEvent,
} from "react"

const [MenuProvider, useMenuContext] = createContext<UseMenuReturn>({
  strict: false,
  name: "MenuContext",
})

export { MenuProvider, useMenuContext }

export interface UseMenuProps extends UsePopperProps {
  /**
   * Unique id to be used by menu and it's children
   */
  id?: string
  /**
   * If `true`, the menu will close when a menu item is
   * clicked
   *
   * @default true
   */
  closeOnSelect?: boolean
  /**
   * If `true`, the menu will close when you click outside
   * the menu list
   */
  closeOnBlur?: boolean
  /**
   * If `true`, the first enabled menu item will be selected
   * when the menu opens.
   *
   * @default true
   */
  autoSelect?: boolean
  /**
   * The Popper.js modifiers to use
   */
  modifiers?: UsePopperProps["modifiers"]
  /**
   * Performance 🚀:
   * If `true`, the MenuItem rendering will be deferred
   * until the menu is open.
   */
  isLazy?: boolean
  /**
   * If `true`, the top-level menu will be opened in controlled mode
   */
  isOpen?: boolean
  /**
   * If `true`, the top-level menu will be opened in un-controlled mode
   */
  defaultIsOpen?: boolean
  /**
   * Function to be called when menu is open
   */
  onOpen?: () => void
  /**
   * Function to be called when menu is closed
   */
  onClose?: () => void
}

/**
 * React Hook to manage a menu
 *
 * It provides the logic and will be used with react context
 * to propagate it's return value to all children
 */
export function useMenu(props: UseMenuProps) {
  const {
    id,
    closeOnSelect = true,
    closeOnBlur = true,
    autoSelect = true,
    placement: placementProp = "bottom-start",
    gutter,
    fixed = true,
    preventOverflow,
    modifiers,
    isLazy,
  } = props

  const { isOpen, onOpen, onClose, onToggle } = useDisclosure(props)

  /**
   * Prepare the reference to the menu and disclosure
   */
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useInteractOutside({
    ref: menuRef,
    onInteractOutside: (event) => {
      if (
        closeOnBlur &&
        !buttonRef.current?.contains(event.target as HTMLElement)
      ) {
        onClose()
      }
    },
  })

  /**
   * Add some popper.js for dynamic positioning
   */
  const { placement, popper, reference } = usePopper({
    placement: placementProp,
    fixed,
    forceUpdate: isOpen,
    gutter,
    preventOverflow,
    modifiers,
  })

  const [focusedIndex, setFocusedIndex] = useState(-1)

  /**
   * Context to register all menu item nodes
   */
  const domContext = useDescendants<HTMLDivElement, {}>()

  /**
   * Focus the button when we close the menu
   */
  useUpdateEffect(() => {
    if (!isOpen) {
      setFocusedIndex(-1)
      if (buttonRef.current) {
        focus(buttonRef.current, {
          preventScroll: true,
        })
      }
    }
  }, [isOpen])

  /**
   * Generate unique ids for menu's list and button
   */
  const [buttonId, menuId] = useIds(id, `menu-button`, `menu-list`)

  return {
    domContext,
    popper,
    placement,
    reference,
    buttonId,
    menuId,
    orientation: "vertical",
    isOpen,
    onToggle,
    onOpen,
    onClose,
    menuRef,
    buttonRef,
    focusedIndex,
    closeOnSelect,
    closeOnBlur,
    autoSelect,
    setFocusedIndex,
    isLazy,
  }
}

export interface UseMenuReturn extends ReturnType<typeof useMenu> {}

/**
 * React Hook to manage a menu list.
 *
 * The assumption here is that the `useMenu` hook is used
 * in a component higher up the tree, and it's return value
 * is passed as `context` to this hook.
 */

export interface UseMenuListProps extends HTMLAttributes<Element> {}

export function useMenuList(props: UseMenuListProps) {
  const menu = useMenuContext()

  const {
    focusedIndex,
    setFocusedIndex,
    menuRef,
    isOpen,
    onClose,
    popper,
    menuId,
    placement,
    domContext: { descendants },
    isLazy,
  } = menu

  /**
   * Hook that creates a keydown event handler that listens
   * to printable keyboard character press
   */
  const onCharacterPress = useShortcut({
    preventDefault: (event) => event.key !== " ",
  })

  const onKeyDown = createOnKeyDown({
    onKeyDown: onCharacterPress((character) => {
      /**
       * Typeahead: Based on current character pressed,
       * find the next item to be selected
       */
      const nextItem = getNextItemFromSearch(
        descendants,
        character,
        (node) => node.element?.textContent || "",
        descendants[focusedIndex],
      )

      if (nextItem) {
        const index = descendants.indexOf(nextItem)
        setFocusedIndex(index)
      }
    }),
    keyMap: {
      Escape: onClose,
      ArrowDown: () => {
        const nextIndex = getNextIndex(focusedIndex, descendants.length)
        setFocusedIndex(nextIndex)
      },
      ArrowUp: () => {
        const prevIndex = getPrevIndex(focusedIndex, descendants.length)
        setFocusedIndex(prevIndex)
      },
    },
  })

  return {
    ...props,
    children: isLazy ? (isOpen ? props.children : null) : props.children,
    className: cx("chakra-menu__menu-list", props.className),
    ref: mergeRefs(menuRef, popper.ref),
    tabIndex: -1,
    role: "menu",
    id: menuId,
    hidden: !isOpen,
    "aria-orientation": "vertical" as React.AriaAttributes["aria-orientation"],
    "data-placement": placement,
    style: { ...props.style, ...popper.style },
    onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
  }
}

/**
 * React Hook to manage a menu button.
 *
 * The assumption here is that the `useMenu` hook is used
 * in a component higher up the tree, and it's return value
 * is passed as `context` to this hook.
 */

export interface UseMenuButtonProps extends HTMLAttributes<Element> {}

export function useMenuButton(props: UseMenuButtonProps) {
  const menu = useMenuContext()

  const {
    setFocusedIndex,
    onOpen,
    isOpen,
    onClose,
    autoSelect,
    menuRef,
    domContext: { descendants },
  } = menu

  const openAndFocusMenu = useCallback(() => {
    onOpen()
    if (menuRef.current) {
      focus(menuRef.current)
    }
  }, [onOpen, menuRef])

  const openAndFocusFirstItem = useCallback(() => {
    onOpen()
    setFocusedIndex(0)
  }, [onOpen, setFocusedIndex])

  const openAndFocusLastItem = useCallback(() => {
    onOpen()
    const lastIndex = descendants.length - 1
    setFocusedIndex(lastIndex)
  }, [onOpen, setFocusedIndex, descendants])

  const onClick = useCallback(() => {
    if (isOpen) {
      onClose()
    } else {
      const action = autoSelect ? openAndFocusFirstItem : openAndFocusMenu
      action()
    }
  }, [autoSelect, isOpen, onClose, openAndFocusFirstItem, openAndFocusMenu])

  const onKeyDown = createOnKeyDown({
    keyMap: {
      Enter: openAndFocusFirstItem,
      ArrowDown: openAndFocusFirstItem,
      ArrowUp: openAndFocusLastItem,
    },
  })

  return {
    ...props,
    ref: mergeRefs(menu.buttonRef, menu.reference.ref),
    className: cx("chakra-menu__menu-button", props.className),
    id: menu.buttonId,
    "data-active": dataAttr(menu.isOpen),
    "aria-expanded": menu.isOpen,
    "aria-haspopup": "menu" as React.AriaAttributes["aria-haspopup"],
    "aria-controls": menu.menuId,
    onClick: callAllHandlers(props.onClick, onClick),
    onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
  }
}

export interface UseMenuItemProps extends HTMLAttributes<Element> {
  isDisabled?: boolean
  isFocusable?: boolean
}

export function useMenuItem(props: UseMenuItemProps) {
  const {
    onMouseOut: onMouseOutProp,
    onClick: onClickProp,
    isDisabled,
    isFocusable,
    ...htmlProps
  } = props

  const menu = useMenuContext()

  const {
    domContext,
    setFocusedIndex,
    focusedIndex,
    closeOnSelect,
    onClose,
    menuRef,
  } = menu

  const ref = useRef<HTMLDivElement>(null)
  const id = `menuitem-${useId()}`

  /**
   * Register the menuitem's node into the domContext
   */
  const index = useDescendant({
    element: ref.current,
    context: domContext,
    disabled: isDisabled,
    focusable: isFocusable,
  })

  const onMouseEnter = useCallback(() => {
    if (isDisabled) return
    setFocusedIndex(index)
  }, [setFocusedIndex, index, isDisabled])

  const onMouseMove = useCallback(() => {
    if (document.activeElement !== ref.current) {
      onMouseEnter()
    }
  }, [onMouseEnter])

  const onMouseLeave = useCallback(() => {
    if (isDisabled) return
    setFocusedIndex(-1)
  }, [setFocusedIndex, isDisabled])

  const onClick = useCallback(
    (event: MouseEvent) => {
      onClickProp?.(event)
      /**
       * Close menu and parent menu's if `closeOnSelect` is set to `true`
       */
      if (closeOnSelect) {
        onClose()
      }
    },
    [onClose, onClickProp, closeOnSelect],
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
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    ref,
    isDisabled,
    isFocusable,
  })

  return {
    ...htmlProps,
    ...tabbable,
    className: cx("chakra-menu__menuitem", htmlProps.className),
    id,
    role: "menuitem",
    tabIndex: isFocused ? 0 : -1,
  }
}

export interface UseMenuOptionProps extends UseMenuItemProps {
  value?: string
  isChecked?: boolean
  type?: "radio" | "checkbox"
  children?: React.ReactNode
}

export function useMenuOption(props: UseMenuOptionProps) {
  const {
    onMouseOut,
    onClick,
    isDisabled,
    isFocusable,
    type = "radio",
    isChecked,
    ...rest
  } = props

  const ownProps = useMenuItem({
    isDisabled,
    isFocusable,
    onClick,
  })

  return {
    ...rest,
    ...ownProps,
    className: cx("chakra-menu__menuitem-option", rest.className),
    role: `menuitem${type}`,
    "aria-checked": isChecked as React.AriaAttributes["aria-checked"],
  }
}

export interface UseMenuOptionGroupProps {
  value?: string | string[]
  defaultValue?: string | string[]
  type?: "radio" | "checkbox"
  onChange?: (value: string | string[]) => void
  children?: React.ReactNode
  className?: string
}

export function useMenuOptionGroup(props: UseMenuOptionGroupProps) {
  const {
    children,
    type = "radio",
    value: valueProp,
    defaultValue,
    onChange,
    ...htmlProps
  } = props

  const isRadio = type === "radio"

  const fallback = isRadio ? "" : []

  const [value, setValue] = useControllableState({
    defaultValue: defaultValue ?? fallback,
    value: valueProp,
    onChange,
  })

  const handleChange = useCallback(
    (selectedValue: string) => {
      if (type === "radio" && isString(value)) {
        setValue(selectedValue)
      }

      if (type === "checkbox" && isArray(value)) {
        const nextValue = value.includes(selectedValue)
          ? removeItem(value, selectedValue)
          : addItem(value, selectedValue)

        setValue(nextValue)
      }
    },
    [value, setValue, type],
  )

  const validChildren = getValidChildren(children)

  const clones = validChildren.map((child) => {
    const onClick = (event: MouseEvent) => {
      handleChange(child.props.value)
      child.props.onClick?.(event)
    }

    const isChecked =
      type === "radio"
        ? child.props.value === value
        : value.includes(child.props.value)

    return cloneElement(child, {
      type,
      onClick,
      isChecked,
    })
  })

  return {
    ...htmlProps,
    className: cx("chakra-menu__option-group", htmlProps.className),
    children: clones,
  }
}

export function useMenuState() {
  const { isOpen, onClose } = useMenuContext()
  return { isOpen, onClose }
}
