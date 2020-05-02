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
import { usePopper } from "@chakra-ui/popper"
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
} from "@chakra-ui/utils"
import * as React from "react"

export interface UseMenuProps {
  /**
   * The parent menu's context
   */
  context?: UseMenuReturn
  /**
   * Unique id to be used by menu and it's children
   */
  id?: string
  /**
   * If `true`, the menu will close when a menu item is
   * clicked
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
   */
  autoSelect?: boolean
}

/**
 * React Hook to manage a menu
 *
 * It provides the logic and will be used with react context
 * to propagate it's return value to all children
 */
export function useMenu(props: UseMenuProps) {
  const {
    context,
    id,
    closeOnSelect = true,
    closeOnBlur = true,
    autoSelect = true,
  } = props

  /**
   * If this menu is a nested menu, that means
   * there's a parent menu context
   */
  const parentMenu = context

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

  /**
   * Add some popper.js for dynamic positioning
   */
  const { placement, popper, reference } = usePopper({
    placement: !hasParentMenu ? "bottom-start" : "right-start",
    fixed: true,
    forceUpdate: isOpen,
    gutter: hasParentMenu ? 0 : undefined,
  })

  const [focusedIndex, setFocusedIndex] = React.useState(-1)

  /**
   * We use this context to register all menu items nodes
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
   * Let's focus the top-level disclosure when we close the menu
   */
  useUpdateEffect(() => {
    if (!isOpen && !hasParentMenu) {
      buttonRef.current?.focus()
    }
  }, [isOpen, hasParentMenu])

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
  }
}

export interface UseMenuReturn extends ReturnType<typeof useMenu> {}

/**
 * React Hook to manage a menu list.
 *
 * The assumption here is that the `useMenu` hook is used
 * in a component higher up the tree.
 *
 * The hook tree will look like this:
 *
 * - useMenu (return value is passed to useMenuList)
 *   - useMenuList (return value is passed to useMenuItem)
 *     - useMenuItem
 */

export interface UseMenuListProps {
  onMouseEnter?: React.MouseEventHandler
  onKeyDown?: React.KeyboardEventHandler
  /**
   * Return value from `useMenu` hook
   */
  context: UseMenuReturn
  style?: React.CSSProperties
  hidden?: boolean
}

export function useMenuList(props: UseMenuListProps) {
  const { context: menu, ...rest } = props

  const {
    focusedIndex,
    setFocusedIndex,
    hasParentMenu,
    closeOnBlur,
    buttonRef,
    menuRef,
    isOpen,
    onClose,
    onOpen,
    domContext: { descendants },
  } = menu

  /**
   * Effect to close this menu on outside click
   */
  React.useEffect(() => {
    const click = (event: MouseEvent) => {
      /**
       * if the menu is not open, don't do anything
       */
      if (!isOpen) return

      /**
       * if the click is within the menu container, don't do anything
       */
      if (menuRef.current?.contains(event.target as HTMLElement)) {
        return
      }

      /**
       * Nested menu: If we're clicking on a `menuitem` that's a button for another
       * menu, don't do anything.
       */
      if (event.target === buttonRef.current) {
        return
      }

      /**
       * Otherwise, close the menu provided `closeOnBlur` is set to `true`
       */
      if (closeOnBlur) {
        onClose()
      }
    }
    /**
     * add the event listener for click
     */
    document.addEventListener("click", click)
    return () => {
      /**
       * remove the event listener, to avoid memory leak
       */
      document.removeEventListener("click", click)
    }
  }, [onClose, hasParentMenu, closeOnBlur, buttonRef, menuRef, isOpen])

  const onMouseEnter = () => {
    /**
     * If we're in a nested menu, keep the menu open when we mouse into it
     */
    if (hasParentMenu) {
      onOpen()
    }
  }

  const onCharacterPress = useShortcut({
    preventDefault: event => event.key !== " ",
  })

  const onKeyDown = createOnKeyDown({
    stopPropagation: event => {
      if (event.key === "Escape" && hasParentMenu) {
        return false
      }
      return true
    },
    onKeyDown: onCharacterPress(character => {
      const nextItem = getNextItemFromSearch(
        descendants,
        character,
        node => node.element?.textContent || "",
        descendants[focusedIndex],
      )

      if (nextItem) {
        const index = descendants.indexOf(nextItem)
        setFocusedIndex(index)
      }
    }),
    keyMap: {
      Escape: menu.onClose,
      ArrowDown: () => {
        const nextIndex = getNextIndex(focusedIndex, descendants.length)
        setFocusedIndex(nextIndex)
      },
      ArrowUp: () => {
        const prevIndex = getPrevIndex(focusedIndex, descendants.length)
        setFocusedIndex(prevIndex)
      },
      ArrowLeft: () => {
        if (!hasParentMenu) return
        menu.onClose()
        const node = menu.buttonRef.current
        node?.focus()
      },
    },
  })

  return {
    ...rest,
    ref: mergeRefs(menu.menuRef, menu.popper.ref),
    tabIndex: -1,
    role: "menu",
    id: menu.menuId,
    hidden: !menu.isOpen,
    "aria-orientation": "vertical" as React.AriaAttributes["aria-orientation"],
    "data-placement": menu.placement,
    style: { ...rest.style, ...menu.popper.style },
    onMouseEnter: callAllHandlers(props.onMouseEnter, onMouseEnter),
    onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
  }
}

/**
 * MenuButton Hook
 */

export interface UseMenuButtonProps {
  onMouseOver?: React.MouseEventHandler
  onClick?: React.MouseEventHandler
  onMouseOut?: React.MouseEventHandler
  onKeyDown?: React.KeyboardEventHandler
  context: UseMenuReturn
}

export function useMenuButton(props: UseMenuButtonProps) {
  const { context: menu, ...htmlProps } = props
  const {
    setFocusedIndex,
    onOpen,
    domContext: { descendants },
  } = menu

  // check if this disclosure is for a nested menu
  // in this case, it's both a disclosure and menu item
  const hasParentMenu = Boolean(menu.parentMenu)

  const onClick = () => {
    // if it's the top-level disclosure, toggle the menu
    if (!hasParentMenu) {
      if (menu.isOpen) {
        menu.onClose()
      } else {
        openAndFocusFirstItem()
      }
    }
  }

  const onMouseOver = (event: React.MouseEvent) => {
    // top-level disclosure don't open on mouseover
    // so we do nothing
    if (!hasParentMenu) return

    const self = event.currentTarget as HTMLElement

    // open the nested menu after a delay
    setTimeout(() => {
      if (self.contains(document.activeElement)) {
        menu.onOpen()
        // if this menu item hasn't received focus due to browser
        // issues, force it to focus
        if (document.activeElement !== self) {
          self.focus()
        }
      }
    }, 200)
  }

  const onMouseOut = (event: React.MouseEvent) => {
    // if we mouseout to any menuitem within parent menu
    // we'll close the nested menu
    const parentMenuList = menu.parentMenu?.menuRef.current
    const target = event.currentTarget as HTMLElement

    if (parentMenuList?.contains(target)) {
      menu.onClose()
    }
  }

  const openAndFocusFirstItem = React.useCallback(() => {
    onOpen()
    const firstIndex = 0
    setFocusedIndex(firstIndex)
    requestAnimationFrame(() => {
      descendants[firstIndex].element?.focus()
    })
  }, [descendants, onOpen, setFocusedIndex])

  const showAndFocusLastItem = React.useCallback(() => {
    onOpen()
    const lastIndex = descendants.length - 1
    setFocusedIndex(lastIndex)
    requestAnimationFrame(() => {
      descendants[lastIndex].element?.focus()
    })
  }, [onOpen, setFocusedIndex, descendants])

  const onKeyDown = createOnKeyDown({
    preventDefault: false,
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
          showAndFocusLastItem()
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
    ...htmlProps,
    ref: mergeRefs(menu.buttonRef, menu.reference.ref),
    id: menu.buttonId,
    "aria-expanded": menu.isOpen,
    "aria-haspopup": "menu" as React.AriaAttributes["aria-haspopup"],
    "aria-controls": menu.menuId,
    onClick: callAllHandlers(props.onClick, onClick),
    onMouseEnter: callAllHandlers(props.onMouseOver, onMouseOver),
    onMouseOut: callAllHandlers(props.onMouseOut, onMouseOut),
    onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
  }
}

/**
 * MenuItem Hook
 */

export interface UseMenuItemProps {
  onMouseOut?: React.MouseEventHandler
  context: UseMenuReturn
  onClick?: React.MouseEventHandler
  isDisabled?: boolean
  isFocusable?: boolean
}

export function useMenuItem(props: UseMenuItemProps) {
  const {
    context: menu,
    onMouseOut: onMouseOutProp,
    onClick: onClickProp,
    isDisabled,
    isFocusable,
    ...htmlProps
  } = props

  const {
    domContext,
    setFocusedIndex,
    focusedIndex,
    menuRef,
    closeOnSelect,
  } = menu

  const ref = React.useRef<HTMLDivElement>(null)
  const id = useId(undefined, `chakra-menu-item`)

  const index = useDescendant({
    element: ref.current,
    context: domContext,
    disabled: isDisabled,
    focusable: isFocusable,
  })

  const onMouseOver = React.useCallback(
    (event: React.MouseEvent) => {
      if (!event.currentTarget) return
      const self = event.currentTarget as HTMLElement
      self.focus()
      setFocusedIndex(index)
    },
    [setFocusedIndex, index],
  )

  const onMouseOut = React.useCallback(
    (event: React.MouseEvent) => {
      const menuNode = menuRef.current
      const self = event.currentTarget as HTMLElement
      self.blur()

      if (document.activeElement === document.body && menuNode) {
        menuNode.focus()
      }

      onMouseOutProp?.(event)
    },
    [menuRef, onMouseOutProp],
  )

  const onClick = React.useCallback(
    (event: React.MouseEvent) => {
      // If we're clicking on an menuitem that's a menu-button for a submenu
      // ignore the click
      if (event.currentTarget.hasAttribute("aria-controls")) {
        return
      }

      onClickProp?.(event)

      if (!closeOnSelect) return

      // close the current menu only if closeOnSelect is `true`
      menu.onClose()

      // close all parent menus recursively
      let next = menu.parentMenu
      while (next != null) {
        next.onClose()
        next = next.parentMenu
      }
    },
    [menu, onClickProp, closeOnSelect],
  )

  const isFocused = index === focusedIndex

  React.useEffect(() => {
    if (!ref.current) return

    if (isFocused && document.activeElement !== ref.current) {
      ref.current.focus()
    }
  }, [isFocused])

  const tabbable = useClickable({
    onClick,
    onMouseOver,
    ref,
    isDisabled,
    isFocusable,
  })

  return {
    ...htmlProps,
    ...tabbable,
    id,
    onMouseOut,
    role: "menuitem",
    tabIndex: isFocused ? 0 : -1,
  }
}

export type UseMenuOptionProps = UseMenuItemProps & {
  value?: string
  isChecked?: string
  type?: "radio" | "checkbox"
}

export function useMenuOption(props: UseMenuOptionProps) {
  const {
    context: menu,
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
    context: menu,
    onClick,
  })

  return {
    ...rest,
    ...ownProps,
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
    ...rest
  } = props

  const isRadio = type === "radio"

  const fallback = isRadio ? "" : []

  const [value, setValue] = useControllableState({
    defaultValue: defaultValue || fallback,
    value: valueProp,
    onChange,
  })

  const handleChange = React.useCallback(
    (selectedValue: string) => {
      if (type === "radio") {
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

  const clones = validChildren.map(child =>
    React.cloneElement(child, {
      type,
      key: child.props.value,
      onClick: (event: React.MouseEvent) => {
        handleChange(child.props.value)
        child.props?.onClick?.(event)
      },
      isChecked:
        type === "radio"
          ? child.props.value === value
          : value.includes(child.props.value),
    }),
  )

  return {
    ...rest,
    children: clones,
  }
}
