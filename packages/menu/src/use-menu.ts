import { useClickable } from "@chakra-ui/clickable"
import { useDescendant, useDescendants } from "@chakra-ui/descendant"
import {
  useControllableState,
  useDisclosure,
  useId,
  useIds,
  useShortcut,
  useUpdateEffect,
  useEventListener,
} from "@chakra-ui/hooks"
import { usePopper, UsePopperProps } from "@chakra-ui/popper"
import {
  addItem,
  callAllHandlers,
  createOnKeyDown,
  getNextIndex,
  getNextItemFromSearch,
  getPrevIndex,
  getValidChildren,
  isArray,
  mergeRefs,
  removeItem,
  cx,
  isString,
  dataAttr,
  focus,
  createContext,
} from "@chakra-ui/utils"
import * as React from "react"

const [MenuContextProvider, useMenuContext] = createContext<UseMenuReturn>({
  strict: false,
  name: "MenuContext",
})

export { MenuContextProvider, useMenuContext }

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
}

function useBlurOutside(
  buttonRef: React.RefObject<HTMLElement>,
  menuRef: React.RefObject<HTMLElement>,
  options: {
    action: () => void
    visible: boolean
  },
) {
  const onDocumentMouseDown = (event: MouseEvent) => {
    if (!options.visible) return

    const target = event.target as HTMLElement

    const condition =
      buttonRef.current === target ||
      menuRef.current?.contains(target) ||
      buttonRef.current?.contains(target) ||
      target.getAttribute("role") === "menuitem"

    if (!condition) {
      options.action()
    }
  }

  useEventListener("mousedown", onDocumentMouseDown)
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

  /**
   * If this menu is a nested menu, that means
   * there's a parent menu context
   */
  const parentMenu = useMenuContext() as UseMenuReturn | undefined

  /**
   * Check if this menu is a nested menu or top level menu
   */
  const hasParentMenu = Boolean(parentMenu)

  /**
   * Regular open and close stuff
   */
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure()

  /**
   * Prepare the reference to the menu and disclosure
   */
  const menuRef = React.useRef<HTMLDivElement>(null)
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  useBlurOutside(buttonRef, menuRef, {
    action: onClose,
    visible: isOpen && !hasParentMenu,
  })

  /**
   * Add some popper.js for dynamic positioning
   */
  const { placement, popper, reference } = usePopper({
    placement: !hasParentMenu ? placementProp : "right-start",
    fixed,
    forceUpdate: isOpen,
    gutter: hasParentMenu ? 0 : gutter,
    preventOverflow,
    modifiers: hasParentMenu ? undefined : modifiers,
  })

  const [focusedIndex, setFocusedIndex] = React.useState(-1)

  /**
   * Context to register all menu item nodes
   */
  const domContext = useDescendants<HTMLDivElement, {}>()

  /**
   * Safety: If a parent menu is closed, we need to ensure
   * all children menus are closed as well
   */
  React.useEffect(() => {
    if (!parentMenu) return

    const parentIsNotOpen = hasParentMenu && !parentMenu.isOpen

    if (isOpen && parentIsNotOpen) {
      onClose()
    }
  }, [isOpen, onClose, parentMenu, hasParentMenu])

  /**
   * Focus the top-level disclosure when we close the menu
   */
  useUpdateEffect(() => {
    if (!isOpen && !hasParentMenu) {
      if (buttonRef.current) {
        focus(buttonRef.current)
      }
    }
  }, [isOpen, hasParentMenu])

  /**
   * Reset the focused index if the menu is closed
   */
  React.useEffect(() => {
    if (!isOpen) {
      setFocusedIndex(-1)
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
    parentMenu,
    hasParentMenu,
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

export interface UseMenuListProps {
  onMouseEnter?: React.MouseEventHandler
  onBlur?: React.FocusEventHandler
  onKeyDown?: React.KeyboardEventHandler
  style?: React.CSSProperties
  className?: string
  hidden?: boolean
  children?: React.ReactNode
}

export function useMenuList(props: UseMenuListProps) {
  const menu = useMenuContext()

  const {
    focusedIndex,
    setFocusedIndex,
    hasParentMenu,
    parentMenu,
    closeOnBlur,
    buttonRef,
    menuRef,
    isOpen,
    onClose,
    onOpen,
    popper,
    menuId,
    placement,
    domContext: { descendants },
    isLazy,
  } = menu

  /**
   * Effect to close this menu on outside click
   */
  const onDocumentClick = React.useCallback(
    (event: MouseEvent) => {
      const target = event.target as HTMLElement
      /**
       * if the menu is not open, don't do anything
       */
      if (!isOpen) return

      /**
       * if the click is within the menu container, don't do anything
       */
      if (menuRef.current?.contains(target)) {
        return
      }

      /**
       * Nested menu: Don't trigger close if we're clicking on a menu item that doubles
       * as a menu button.
       */
      const parentIsButton = target?.parentElement?.hasAttribute(
        "aria-controls",
      )
      const isButton = target?.hasAttribute("aria-controls")

      if (parentIsButton || isButton) {
        return
      }

      /**
       * Otherwise, close the menu provided `closeOnBlur` is set to `true`
       */
      if (closeOnBlur) {
        onClose()
      }
    },
    [onClose, closeOnBlur, menuRef, isOpen],
  )

  useEventListener("click", onDocumentClick)

  const onMouseEnter = () => {
    /**
     * If we're in a nested menu, keep the menu open when we mouse into it
     */
    if (hasParentMenu) {
      onOpen()
    }
  }

  /**
   * Hook that creates a keydown event handler that listens
   * to printable keyboard character press
   */
  const onCharacterPress = useShortcut({
    preventDefault: (event) => event.key !== " ",
  })

  const onKeyDown = createOnKeyDown({
    /**
     * Allow `Escape` key to propagate to it's parent
     * which will trigger close for all parent menus.
     *
     * In any other case, don't allow propagation
     */
    stopPropagation: (event) => {
      if (event.key === "Escape" && hasParentMenu) {
        return false
      }
      return true
    },
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
      Escape: () => {
        onClose()
        let next = menu.parentMenu
        while (next != null) {
          next.onClose()
          next = next.parentMenu
        }
      },
      ArrowDown: () => {
        const nextIndex = getNextIndex(focusedIndex, descendants.length)
        setFocusedIndex(nextIndex)
      },
      ArrowUp: () => {
        const prevIndex = getPrevIndex(focusedIndex, descendants.length)
        setFocusedIndex(prevIndex)
      },
      ArrowLeft: () => {
        /**
         * If this is a nested menu, and user presses `ArrowLeft`,
         * we'll close the nested menu and move back to the parent menu
         */
        if (hasParentMenu) {
          onClose()
          if (buttonRef.current) {
            focus(buttonRef.current)
          }
        }
      },
    },
  })

  const onBlur = React.useCallback(
    (event: React.FocusEvent<HTMLElement>) => {
      const target = (event.relatedTarget ||
        document.activeElement) as HTMLElement
      const isWithinSelf = menuRef.current?.contains(target)
      const isInParent = parentMenu?.menuRef.current?.contains(target)
      const isMenuButton = target === buttonRef.current

      if (!isWithinSelf && hasParentMenu && !isMenuButton && isInParent) {
        onClose()
      }
    },
    [menuRef, buttonRef, hasParentMenu, onClose, parentMenu?.menuRef],
  )

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
    onMouseEnter: callAllHandlers(props.onMouseEnter, onMouseEnter),
    onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
    onBlur: callAllHandlers(props.onBlur, onBlur),
  }
}

/**
 * React Hook to manage a menu button.
 *
 * The assumption here is that the `useMenu` hook is used
 * in a component higher up the tree, and it's return value
 * is passed as `context` to this hook.
 */

export interface UseMenuButtonProps {
  onMouseEnter?: React.MouseEventHandler
  onClick?: React.MouseEventHandler
  onMouseLeave?: React.MouseEventHandler
  onKeyDown?: React.KeyboardEventHandler
  className?: string
}

export function useMenuButton(props: UseMenuButtonProps) {
  const menu = useMenuContext()

  const {
    setFocusedIndex,
    onOpen,
    hasParentMenu,
    isOpen,
    onClose,
    parentMenu,
    autoSelect,
    menuRef,
    domContext: { descendants },
  } = menu

  const openAndFocusMenu = React.useCallback(() => {
    onOpen()
    if (menuRef.current) {
      focus(menuRef.current)
    }
  }, [onOpen, menuRef])

  const openAndFocusFirstItem = React.useCallback(() => {
    onOpen()
    setFocusedIndex(0)
  }, [onOpen, setFocusedIndex])

  const openAndFocusLastItem = React.useCallback(() => {
    onOpen()
    const lastIndex = descendants.length - 1
    setFocusedIndex(lastIndex)
  }, [onOpen, setFocusedIndex, descendants])

  /**
   * Click handler for the top-level menu button
   */
  const onClick = React.useCallback(
    (event: React.MouseEvent) => {
      /**
       * Prevent this action if it's not top-level button
       */
      if (hasParentMenu) {
        return
      }

      if (isOpen) {
        onClose()
      }

      if (!isOpen) {
        const fn = autoSelect ? openAndFocusFirstItem : openAndFocusMenu
        fn()
      }
    },
    [
      autoSelect,
      hasParentMenu,
      isOpen,
      onClose,
      openAndFocusFirstItem,
      openAndFocusMenu,
    ],
  )

  const onMouseEnter = (event: React.MouseEvent) => {
    /**
     * Prevent this action if button it's a top-level menu button,
     * since top-level menus don't open on mouse-over but on click.
     *
     * Only nested menus open on mouse over.
     */
    if (!hasParentMenu) return

    const self = event.currentTarget as HTMLElement

    /**
     * Open the nested menu after a delay
     */
    setTimeout(() => {
      if (self.contains(document.activeElement)) {
        onOpen()
        /**
         * If this menu item hasn't received focus due to browser
         * issues, force it to focus
         */
        if (document.activeElement !== self) {
          self.focus()
        }
      }
    }, 200)
  }

  const onMouseLeave = (event: React.MouseEvent) => {
    /**
     * If we mouseout to any menu item within parent menu
     * we'll close the nested menu
     */
    const parentMenuList = parentMenu?.menuRef.current
    const target = event.currentTarget as HTMLElement

    if (parentMenuList?.contains(target)) {
      onClose()
    }
  }

  const onKeyDown = createOnKeyDown({
    preventDefault: !hasParentMenu,
    keyMap: {
      Enter: () => {
        openAndFocusFirstItem()
      },
      ArrowDown: () => {
        if (!hasParentMenu) {
          openAndFocusFirstItem()
        }
      },
      ArrowUp: () => {
        if (!hasParentMenu) {
          openAndFocusLastItem()
        }
      },
      ArrowRight: () => {
        if (hasParentMenu) {
          openAndFocusFirstItem()
        }
      },
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
    onMouseEnter: callAllHandlers(props.onMouseEnter, onMouseEnter),
    onMouseLeave: callAllHandlers(props.onMouseLeave, onMouseLeave),
    onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
  }
}

/**
 * React Hook to manage a menu item.
 *
 * The assumption here is that the `useMenu` hook is used
 * in a component higher up the tree, and it's return value
 * is passed as `context` to this hook.
 */

export interface UseMenuItemProps {
  onMouseOut?: React.MouseEventHandler
  onClick?: React.MouseEventHandler
  isDisabled?: boolean
  isFocusable?: boolean
  className?: string
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

  const ref = React.useRef<HTMLDivElement>(null)
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

  const onMouseEnter = React.useCallback(() => {
    if (isDisabled) return
    setFocusedIndex(index)
  }, [setFocusedIndex, index, isDisabled])

  const onMouseMove = React.useCallback(() => {
    if (document.activeElement !== ref.current) {
      onMouseEnter()
    }
  }, [onMouseEnter])

  const onMouseLeave = React.useCallback(() => {
    if (isDisabled) return
    setFocusedIndex(-1)
  }, [setFocusedIndex, isDisabled])

  const onClick = React.useCallback(
    (event: React.MouseEvent) => {
      /**
       * If we're clicking on an menuitem that's a menu-button
       * for a submenu ignore the click
       */
      if (event.currentTarget.hasAttribute("aria-controls")) {
        event.preventDefault()
        return
      }

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
  isChecked?: string
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

  const handleChange = React.useCallback(
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
    const onClick = (event: React.MouseEvent) => {
      handleChange(child.props.value)
      child.props.onClick?.(event)
    }

    const isChecked =
      type === "radio"
        ? child.props.value === value
        : value.includes(child.props.value)

    return React.cloneElement(child, {
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

export function useIsSubMenu() {
  const menu = useMenuContext()
  return menu.hasParentMenu
}
