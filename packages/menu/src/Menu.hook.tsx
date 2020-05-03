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
  cx,
  isString,
} from "@chakra-ui/utils"
import * as React from "react"
import { useEffect, useCallback, useRef, cloneElement, useState } from "react"

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
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  /**
   * Add some popper.js for dynamic positioning
   */
  const { placement, popper, reference } = usePopper({
    placement: !hasParentMenu ? "bottom-start" : "right-start",
    fixed: true,
    forceUpdate: isOpen,
    gutter: hasParentMenu ? 0 : undefined,
  })

  const [focusedIndex, setFocusedIndex] = useState(-1)

  /**
   * Context to register all menu item nodes
   */
  const domContext = useDescendants<HTMLDivElement, {}>()

  /**
   * Safety: If a parent menu is closed, we need to ensure
   * all children menus are closed as well
   */
  useEffect(() => {
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
      buttonRef.current?.focus()
    }
  }, [isOpen, hasParentMenu])

  /**
   * Reset the focused index if the menu is closed
   */
  useEffect(() => {
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
 * - useMenu (return value is passed to useMenuList & useMenuButton)
 *   - useMenuButton
 *   - useMenuList (return value is passed to useMenuItem)
 *     - useMenuItem
 */

export interface UseMenuListProps {
  onMouseEnter?: React.MouseEventHandler
  onBlur?: React.FocusEventHandler
  onKeyDown?: React.KeyboardEventHandler
  /**
   * Return value from `useMenu` hook
   */
  context: UseMenuReturn
  style?: React.CSSProperties
  className?: string
  hidden?: boolean
}

export function useMenuList(props: UseMenuListProps) {
  const { context: menu, ...htmlProps } = props

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
    popper,
    menuId,
    placement,
    domContext: { descendants },
  } = menu

  /**
   * Effect to close this menu on outside click
   */
  useEffect(() => {
    const click = (event: MouseEvent) => {
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
       * Nested menu: If we're clicking on a `menuitem` that's a button for another
       * menu, don't do anything.
       */
      if (target === buttonRef.current) {
        return
      }

      /**
       * Nested menu: Don't trigger close if we're clicking on a menu item that doubles
       * as a menu button
       */
      if (target.hasAttribute("aria-controls")) {
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

  /**
   * Hook that creates a keydown event handler that listens
   * to printable keyboard character press
   */
  const onCharacterPress = useShortcut({
    preventDefault: event => event.key !== " ",
  })

  const onKeyDown = createOnKeyDown({
    /**
     * Allow `Escape` key to propagate to it's parent
     * which will trigger close for all parent menus.
     *
     * In any other case, don't allow propagation
     */
    stopPropagation: event => {
      if (event.key === "Escape" && hasParentMenu) {
        return false
      }
      return true
    },
    onKeyDown: onCharacterPress(character => {
      /**
       * Typeahead: Based on current character pressed,
       * find the next item to be selected
       */
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
          buttonRef.current?.focus()
        }
      },
    },
  })

  const onBlur = (e: React.FocusEvent<HTMLElement>) => {
    const target = (e.relatedTarget || document.activeElement) as HTMLElement
    const isWithinSelf = menuRef.current?.contains(target)
    const isInParent = menu.parentMenu?.menuRef.current?.contains(target)
    const isMenuButton = target === buttonRef.current

    if (!isWithinSelf && hasParentMenu && !isMenuButton && isInParent) {
      onClose()
    }
  }

  return {
    ...htmlProps,
    className: cx("chakra-menu__menu-list", htmlProps.className),
    ref: mergeRefs(menuRef, popper.ref),
    tabIndex: -1,
    role: "menu",
    id: menuId,
    hidden: !isOpen,
    "aria-orientation": "vertical" as React.AriaAttributes["aria-orientation"],
    "data-placement": placement,
    style: { ...htmlProps.style, ...popper.style },
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
  onMouseOver?: React.MouseEventHandler
  onClick?: React.MouseEventHandler
  onMouseOut?: React.MouseEventHandler
  onKeyDown?: React.KeyboardEventHandler
  className?: string
  /**
   * Return value from `useMenu` hook
   */
  context: UseMenuReturn
}

export function useMenuButton(props: UseMenuButtonProps) {
  const { context: menu, ...htmlProps } = props

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

  /**
   * Click handler for the top-level menu button
   */
  const onClick = () => {
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
      if (autoSelect) {
        openAndFocusFirstItem()
      } else {
        openAndFocusMenu()
      }
    }
  }

  const onMouseOver = (event: React.MouseEvent) => {
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

  const onMouseOut = (event: React.MouseEvent) => {
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

  const openAndFocusMenu = useCallback(() => {
    onOpen()
    requestAnimationFrame(() => {
      menuRef.current?.focus()
    })
  }, [onOpen, menuRef])

  const openAndFocusFirstItem = useCallback(() => {
    onOpen()
    setFocusedIndex(0)
    requestAnimationFrame(() => {
      descendants[0].element?.focus()
    })
  }, [descendants, onOpen, setFocusedIndex])

  const openAndFocusLastItem = useCallback(() => {
    onOpen()
    const lastIndex = descendants.length - 1
    setFocusedIndex(lastIndex)
    requestAnimationFrame(() => {
      descendants[lastIndex].element?.focus()
    })
  }, [onOpen, setFocusedIndex, descendants])

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
    ...htmlProps,
    ref: mergeRefs(menu.buttonRef, menu.reference.ref),
    className: cx("chakra-menu__menu-button", htmlProps.className),
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
 * React Hook to manage a menu item.
 *
 * The assumption here is that the `useMenu` hook is used
 * in a component higher up the tree, and it's return value
 * is passed as `context` to this hook.
 */

export interface UseMenuItemProps {
  onMouseOut?: React.MouseEventHandler
  /**
   * Return value from `useMenu` hook
   */
  context: UseMenuReturn
  onClick?: React.MouseEventHandler
  isDisabled?: boolean
  isFocusable?: boolean
  className?: string
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

  const onMouseOver = useCallback(() => {
    setFocusedIndex(index)
  }, [setFocusedIndex, index])

  const onMouseOut = useCallback(() => {
    setFocusedIndex(-1)
  }, [setFocusedIndex])

  const onClick = useCallback(
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
      ref.current?.focus()
    } else {
      if (document.activeElement === ref.current) {
        menuRef.current?.focus()
      }
    }
  }, [isFocused, trulyDisabled, menuRef])

  const tabbable = useClickable({
    onClick,
    onMouseOver,
    onMouseOut,
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
    ...htmlProps
  } = props

  const ownProps = useMenuItem({
    isDisabled,
    isFocusable,
    context: menu,
    onClick,
  })

  return {
    ...htmlProps,
    ...ownProps,
    className: cx("chakra-menu__menuitem-option", htmlProps.className),
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

  const clones = validChildren.map(child => {
    const onClick = (event: React.MouseEvent) => {
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
