import { useClickable } from "@chakra-ui/clickable"
import { useDescendant, useDescendants } from "@chakra-ui/descendant"
import {
  useControllableState,
  useDisclosure,
  useEventListener,
  useFocusOnHide,
  useId,
  useIds,
  useOutsideClick,
  useShortcut,
  useUpdateEffect,
} from "@chakra-ui/hooks"
import { usePopper, UsePopperProps } from "@chakra-ui/popper"
import {
  addItem,
  callAllHandlers,
  createContext,
  dataAttr,
  EventKeyMap,
  focus,
  getNextIndex,
  getNextItemFromSearch,
  getPrevIndex,
  getValidChildren,
  isArray,
  isString,
  merge,
  mergeRefs,
  normalizeEventKey,
  removeItem,
} from "@chakra-ui/utils"
import React, {
  cloneElement,
  HTMLAttributes,
  MouseEvent,
  useCallback,
  useRef,
  useState,
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

  useOutsideClick({
    ref: menuRef,
    handler: (event) => {
      if (
        isOpen &&
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
  const popper = usePopper({
    placement: placementProp,
    fixed,
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
    }
  }, [isOpen])

  useFocusOnHide(menuRef, { focusRef: buttonRef, visible: isOpen })

  /**
   * Generate unique ids for menu's list and button
   */
  const [buttonId, menuId] = useIds(id, `menu-button`, `menu-list`)

  const openAndFocusMenu = useCallback(() => {
    onOpen()
    if (menuRef.current) focus(menuRef.current)
  }, [onOpen, menuRef])

  const openAndFocusFirstItem = useCallback(() => {
    onOpen()
    setFocusedIndex(0)
  }, [onOpen, setFocusedIndex])

  const openAndFocusLastItem = useCallback(() => {
    onOpen()
    setFocusedIndex(domContext.descendants.length - 1)
  }, [onOpen, setFocusedIndex, domContext.descendants])

  const refocus = () => {
    const hasFocusWithin = menuRef.current?.contains(document.activeElement)
    const shouldRefocus = isOpen && !hasFocusWithin
    if (!shouldRefocus) return
    requestAnimationFrame(() => {
      const el = domContext.descendants[focusedIndex]?.element
      el?.focus({ preventScroll: true })
    })
  }

  useEventListener("transitionend", refocus, menuRef.current)

  const onTransitionEnd = () => {
    /**
     * If we use CSS for transitioning this component, there would be no
     * need to dispatch a custom event. This is only useful for JS only
     * motion libraries like `framer-motion` to `react-spring`.
     *
     * They usually provide an `onRest` or `onAnimationComplete` callback we can
     * use to trigger the custom `transitionend` event.
     */
    menuRef.current?.dispatchEvent(new Event("transitionend"))
  }

  return {
    openAndFocusMenu,
    openAndFocusFirstItem,
    openAndFocusLastItem,
    onTransitionEnd,
    domContext,
    popper,
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

export interface UseMenuListProps
  extends Omit<HTMLAttributes<Element>, "color"> {}

export function useMenuList(
  props: UseMenuListProps,
  ref: React.Ref<any> = null,
) {
  const menu = useMenuContext()

  if (!menu) {
    throw new Error(
      `useMenuContext: context is undefined. Seems you forgot the component within <Menu>`,
    )
  }

  const {
    focusedIndex,
    setFocusedIndex,
    menuRef,
    isOpen,
    onClose,
    menuId,
    popper,
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

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const eventKey = normalizeEventKey(event)

      const keyMap: EventKeyMap = {
        Escape: onClose,
        ArrowDown: () => {
          const nextIndex = getNextIndex(focusedIndex, descendants.length)
          setFocusedIndex(nextIndex)
        },
        ArrowUp: () => {
          const prevIndex = getPrevIndex(focusedIndex, descendants.length)
          setFocusedIndex(prevIndex)
        },
      }

      const navigationHandler = keyMap[eventKey]

      if (navigationHandler) {
        event.preventDefault()
        navigationHandler(event)
        return
      }

      const characterHandler = onCharacterPress((character) => {
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
      })

      characterHandler(event)
    },
    [descendants, focusedIndex, onCharacterPress, onClose, setFocusedIndex],
  )

  const menulistProps: any = {
    ...props,
    ref: mergeRefs(menuRef, ref),
    children: !isLazy || isOpen ? props.children : null,
    tabIndex: -1,
    role: "menu",
    id: menuId,
    style: {
      ...props.style,
      transformOrigin: popper.transformOrigin,
    },
    "aria-orientation": "vertical" as React.AriaAttributes["aria-orientation"],
    onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
  }

  return menulistProps
}

export function useMenuPositioner(props: any = {}) {
  const { popper, isOpen } = useMenuContext()
  return merge(popper.getPopperProps(props), {
    style: { visibility: isOpen ? "visible" : "hidden" },
  })
}

/**
 * React Hook to manage a menu button.
 *
 * The assumption here is that the `useMenu` hook is used
 * in a component higher up the tree, and it's return value
 * is passed as `context` to this hook.
 */

export interface UseMenuButtonProps
  extends Omit<HTMLAttributes<Element>, "color"> {}

export function useMenuButton(
  props: UseMenuButtonProps,
  externalRef: React.Ref<any> = null,
) {
  const menu = useMenuContext()

  const {
    isOpen,
    onClose,
    autoSelect,
    popper,
    openAndFocusFirstItem,
    openAndFocusLastItem,
    openAndFocusMenu,
  } = menu

  const onClick = useCallback(() => {
    if (isOpen) {
      onClose()
    } else {
      const action = autoSelect ? openAndFocusFirstItem : openAndFocusMenu
      action()
    }
  }, [autoSelect, isOpen, onClose, openAndFocusFirstItem, openAndFocusMenu])

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const eventKey = normalizeEventKey(event)
      const keyMap: EventKeyMap = {
        Enter: openAndFocusFirstItem,
        ArrowDown: openAndFocusFirstItem,
        ArrowUp: openAndFocusLastItem,
      }

      const action = keyMap[eventKey]

      if (action) {
        event.preventDefault()
        event.stopPropagation()
        action(event)
      }
    },
    [openAndFocusFirstItem, openAndFocusLastItem],
  )

  const buttonProps = {
    ...props,
    id: menu.buttonId,
    "data-active": dataAttr(menu.isOpen),
    "aria-expanded": menu.isOpen,
    "aria-haspopup": "menu" as React.AriaAttributes["aria-haspopup"],
    "aria-controls": menu.menuId,
    onClick: callAllHandlers(props.onClick, onClick),
    onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
  }

  return popper.getReferenceProps(
    buttonProps,
    mergeRefs(menu.buttonRef, externalRef),
  )
}

export interface UseMenuItemProps
  extends Omit<HTMLAttributes<Element>, "color"> {
  isDisabled?: boolean
  isFocusable?: boolean
}

export function useMenuItem(
  props: UseMenuItemProps,
  externalRef: React.Ref<any> = null,
) {
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
    if (isFocused && !trulyDisabled && ref.current) {
      focus(ref.current)
    } else if (document.activeElement !== menuRef.current) {
      menuRef.current?.focus()
    }
  }, [isFocused, trulyDisabled, menuRef])

  const tabbable = useClickable({
    onClick,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    ref: mergeRefs(ref, externalRef),
    isDisabled,
    isFocusable,
  })

  return {
    ...htmlProps,
    ...tabbable,
    id,
    role: "menuitem",
    tabIndex: isFocused ? 0 : -1,
  }
}

export interface UseMenuOptionOptions {
  value?: string
  isChecked?: boolean
  type?: "radio" | "checkbox"
  children?: React.ReactNode
}

export interface UseMenuOptionProps
  extends UseMenuItemProps,
    UseMenuOptionOptions {}

export function useMenuOption(
  props: UseMenuOptionProps,
  externalRef: React.Ref<any> = null,
) {
  const {
    onMouseOut,
    onClick,
    isDisabled,
    isFocusable,
    type = "radio",
    isChecked,
    ...rest
  } = props

  const hookProps = { isDisabled, isFocusable, onClick }
  const optionsProps = useMenuItem(hookProps, externalRef)

  return {
    ...rest,
    ...optionsProps,
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
    /**
     * We've added an internal `id` to each `MenuItemOption`,
     * let's use that for type-checking.
     *
     * We can't rely on displayName or the element's type since
     * they can be changed by the user.
     */
    if ((child.type as any).id !== "MenuItemOption") return child

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
    children: clones,
  }
}

export function useMenuState() {
  const { isOpen, onClose } = useMenuContext()
  return { isOpen, onClose }
}
