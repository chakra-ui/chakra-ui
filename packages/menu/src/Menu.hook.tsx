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

export type UseMenuProps = {
  context?: UseMenuReturn
  id?: string
  closeOnSelect?: boolean
  // TODO: Implement these
  closeOnBlur?: boolean
  autoSelect?: boolean
}

export function useMenu(props: UseMenuProps) {
  const { context, id, closeOnSelect = true } = props
  /**
   *
   * if this menu is a nested menu, that means
   * there's a parent menu and a parent MenuContext
   */
  const parent = context

  // Check if this menu is a nested menu or top level menu
  const hasParent = Boolean(parent)

  // Regular open and close stuff
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure()

  // prepare the reference to the menu and disclosure
  const menuRef = React.useRef<HTMLDivElement>(null)
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  // Add some popper.js for dynamic positioning
  const { placement, popper, reference } = usePopper({
    placement: !hasParent ? "bottom-start" : "right-start",
    fixed: true,
    forceUpdate: isOpen,
    gutter: hasParent ? 0 : undefined,
  })

  const [focusedIndex, setFocusedIndex] = React.useState(-1)

  const descendantsContext = useDescendants<HTMLDivElement, {}>()

  /**
   * If a parent menu is closed,
   * this ensure all nested menu are closed as well
   */
  React.useEffect(() => {
    if (!parent) return
    if (isOpen && hasParent && !parent.isOpen) {
      onClose()
    }
  }, [isOpen, onClose, parent, hasParent])

  /**
   * Let's focus the top-level disclosure when we close
   * the menu
   */
  useUpdateEffect(() => {
    if (!isOpen && !hasParent) {
      buttonRef.current?.focus()
    }
  }, [isOpen])

  // generate unique ids for menu and disclosure
  const [disclosureId, menuId] = useIds(id, `menu-disclosure`, `menu-list`)

  return {
    descendantsContext,
    popper,
    placement,
    reference,
    disclosureId,
    menuId,
    parent,
    orientation: "vertical",
    isOpen,
    onToggle,
    onOpen,
    onClose,
    menuRef,
    buttonRef,
    focusedIndex,
    closeOnSelect,
    setFocusedIndex,
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseMenuReturn extends ReturnType<typeof useMenu> {}

//////////////////////////////////////////////////////////////////////////////

export interface MenuListHookProps {
  onMouseEnter?: React.MouseEventHandler
  onKeyDown?: React.KeyboardEventHandler
  context: UseMenuReturn
  style?: React.CSSProperties
  hidden?: boolean
}

export function useMenuList(props: MenuListHookProps) {
  const { context: menu, ...rest } = props
  const {
    focusedIndex,
    setFocusedIndex,
    descendantsContext: { descendants },
  } = menu

  // then check if this menu is a nested menu
  const hasParent = Boolean(menu.parent)

  // side effect to close this menu on outside click
  React.useEffect(() => {
    const click = (event: MouseEvent) => {
      // if the menu is not open, don't do anything
      if (!menu.isOpen) return
      // if the click is within the menu container, don't do anything
      if (menu.menuRef.current?.contains(event.target as HTMLElement)) {
        return
      }
      // If we're clicking on a menuitem that's a disclosure,
      // don't do anything
      if (event.target === menu.buttonRef.current) {
        return
      }
      // otherwise, onClose the menu
      menu.onClose()
    }
    // add the event listener for click
    document.addEventListener("click", click)
    return () => {
      // remove the event listener, to avoid memory leak
      document.removeEventListener("click", click)
    }
  }, [menu, hasParent])

  const onMouseEnter = () => {
    // If we're in a nested menu,
    // keep the menu open when we mouse into it
    if (hasParent) {
      menu.onOpen()
    }
  }

  const onCharacterPress = useShortcut({
    preventDefault: event => event.key !== " ",
  })

  const onKeyDown = createOnKeyDown({
    stopPropagation: event => {
      if (event.key === "Escape" && hasParent) return false
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
        if (!hasParent) return
        menu.onClose()
        const node = menu.buttonRef.current
        node?.focus()
      },
    },
  })

  // merge all the refs
  const ref = mergeRefs(menu.menuRef, menu.popper.ref)

  return {
    ...rest,
    ref,
    tabIndex: -1,
    role: "menu",
    id: menu.menuId,
    hidden: !menu.isOpen,
    "aria-orientation": "vertical" as React.AriaAttributes["aria-orientation"],
    "data-placement": menu.placement,
    style: { ...rest.style, ...menu.popper.style },
    onMouseEnter: callAllHandlers(onMouseEnter, props.onMouseEnter),
    onKeyDown: callAllHandlers(onKeyDown, props.onKeyDown),
  }
}

//////////////////////////////////////////////////////////////////////////////

export interface MenuButtonHookProps {
  onMouseOver?: React.MouseEventHandler
  onClick?: React.MouseEventHandler
  onMouseOut?: React.MouseEventHandler
  onKeyDown?: React.KeyboardEventHandler
  context: UseMenuReturn
}

export function useMenuButton(props: MenuButtonHookProps) {
  const { context: menu, ...htmlProps } = props
  const {
    setFocusedIndex,
    onOpen,
    descendantsContext: { descendants },
  } = menu

  // check if this disclosure is for a nested menu
  // in this case, it's both a disclosure and menu item
  const hasParent = Boolean(menu.parent)

  const onClick = () => {
    // if it's the top-level disclosure, toggle the menu
    if (!hasParent) {
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
    if (!hasParent) return

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
    const parentMenuList = menu.parent?.menuRef.current
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
    keyMap: {
      Enter: () => {
        openAndFocusFirstItem()
      },
      ArrowDown: () => {
        if (!hasParent) {
          openAndFocusFirstItem()
        }
      },
      ArrowUp: () => {
        if (!hasParent) {
          showAndFocusLastItem()
        }
      },
      ArrowRight: () => {
        if (hasParent) {
          openAndFocusFirstItem()
        }
      },
    },
  })

  const ref = mergeRefs(menu.buttonRef, menu.reference.ref)

  return {
    ...htmlProps,
    ref,
    id: menu.disclosureId,
    "aria-expanded": menu.isOpen,
    "aria-haspopup": "menu" as React.AriaAttributes["aria-haspopup"],
    "aria-controls": menu.menuId,
    onClick: callAllHandlers(onClick, props.onClick),
    onMouseEnter: callAllHandlers(onMouseOver, props.onMouseOver),
    onMouseOut: callAllHandlers(onMouseOut, props.onMouseOut),
    onKeyDown: callAllHandlers(onKeyDown, props.onKeyDown),
  }
}

///////////////////////////////////////////////////////////////////////////////////

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
    descendantsContext,
    setFocusedIndex,
    focusedIndex,
    menuRef,
    closeOnSelect,
  } = menu

  const ref = React.useRef<HTMLDivElement>(null)
  const id = useId(undefined, `chakra-menu-item`)

  const index = useDescendant({
    element: ref.current,
    context: descendantsContext,
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
      let next = menu.parent
      while (next != null) {
        next.onClose()
        next = next.parent
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
