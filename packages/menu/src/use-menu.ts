import { useClickable } from "@chakra-ui/clickable"
import { useDescendant, useDescendants } from "@chakra-ui/descendant"
import {
  useControllableState,
  useDisclosure,
  UseDisclosureProps,
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
  mergeRefs,
  normalizeEventKey,
  removeItem,
} from "@chakra-ui/utils"
import * as React from "react"

const [MenuProvider, useMenuContext] = createContext<UseMenuReturn>({
  strict: false,
  name: "MenuContext",
})

export { MenuProvider, useMenuContext }

export interface UseMenuProps extends UsePopperProps, UseDisclosureProps {
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
   *
   * @default true
   */
  closeOnBlur?: boolean
  /**
   * If `true`, the first enabled menu item will receive focus and be selected
   * when the menu opens.
   *
   * @default true
   */
  autoSelect?: boolean
  /**
   * Performance 🚀:
   * If `true`, the MenuItem rendering will be deferred
   * until the menu is open.
   */
  isLazy?: boolean
}

/**
 * React Hook to manage a menu
 *
 * It provides the logic and will be used with react context
 * to propagate its return value to all children
 */
export function useMenu(props: UseMenuProps) {
  const {
    id,
    closeOnSelect = true,
    closeOnBlur = true,
    autoSelect = true,
    isLazy,
    placement = "bottom-start",
  } = props

  const { isOpen, onOpen, onClose, onToggle } = useDisclosure(props)

  /**
   * Prepare the reference to the menu and disclosure
   */
  const menuRef = React.useRef<HTMLDivElement>(null)
  const buttonRef = React.useRef<HTMLButtonElement>(null)

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
    placement,
    ...props,
  })

  const [focusedIndex, setFocusedIndex] = React.useState(-1)

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

  useFocusOnHide(menuRef, {
    focusRef: buttonRef,
    visible: isOpen,
    shouldFocus: true,
  })

  /**
   * Generate unique ids for menu's list and button
   */
  const [buttonId, menuId] = useIds(id, `menu-button`, `menu-list`)

  const openAndFocusMenu = React.useCallback(() => {
    onOpen()
    if (menuRef.current) focus(menuRef.current)
  }, [onOpen, menuRef])

  const openAndFocusFirstItem = React.useCallback(() => {
    onOpen()
    setFocusedIndex(0)
  }, [onOpen, setFocusedIndex])

  const openAndFocusLastItem = React.useCallback(() => {
    onOpen()
    setFocusedIndex(domContext.descendants.length - 1)
  }, [onOpen, setFocusedIndex, domContext.descendants])

  const refocus = React.useCallback(() => {
    const hasFocusWithin = menuRef.current?.contains(document.activeElement)
    const shouldRefocus = isOpen && !hasFocusWithin

    if (!shouldRefocus) return

    const el = domContext.descendants[focusedIndex]?.element
    el?.focus({ preventScroll: true })
  }, [isOpen, focusedIndex, domContext.descendants])

  return {
    openAndFocusMenu,
    openAndFocusFirstItem,
    openAndFocusLastItem,
    onTransitionEnd: refocus,
    domContext,
    popper,
    buttonId,
    menuId,
    forceUpdate: popper.forceUpdate,
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
 * React Hook to manage a menu button.
 *
 * The assumption here is that the `useMenu` hook is used
 * in a component higher up the tree, and its return value
 * is passed as `context` to this hook.
 */

export interface UseMenuButtonProps
  extends Omit<React.HTMLAttributes<Element>, "color"> {}

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

  const onClick = React.useCallback(() => {
    if (isOpen) {
      onClose()
    } else {
      const action = autoSelect ? openAndFocusFirstItem : openAndFocusMenu
      action()
    }
  }, [autoSelect, isOpen, onClose, openAndFocusFirstItem, openAndFocusMenu])

  const onKeyDown = React.useCallback(
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
    ref: mergeRefs(menu.buttonRef, externalRef, popper.referenceRef),
    id: menu.buttonId,
    "data-active": dataAttr(menu.isOpen),
    "aria-expanded": menu.isOpen,
    "aria-haspopup": "menu" as React.AriaAttributes["aria-haspopup"],
    "aria-controls": menu.menuId,
    onClick: callAllHandlers(props.onClick, onClick),
    onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
  }

  return buttonProps
}

/**
 * React Hook to manage a menu list.
 *
 * The assumption here is that the `useMenu` hook is used
 * in a component higher up the tree, and its return value
 * is passed as `context` to this hook.
 */

export interface UseMenuListProps
  extends Omit<React.HTMLAttributes<Element>, "color"> {}

export function useMenuList(
  props: UseMenuListProps,
  ref: React.Ref<any> = null,
) {
  const menu = useMenuContext()

  if (!menu) {
    throw new Error(
      `useMenuContext: context is undefined. Seems you forgot to wrap component within <Menu>`,
    )
  }

  const {
    focusedIndex,
    setFocusedIndex,
    menuRef,
    isOpen,
    onClose,
    menuId,
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

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      const eventKey = normalizeEventKey(event)

      const keyMap: EventKeyMap = {
        Tab: (event) => {
          event.preventDefault()
        },
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

      const fn = keyMap[eventKey]

      if (fn) {
        event.preventDefault()
        fn(event)
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

  return {
    ...props,
    ref: mergeRefs(menuRef, ref),
    children: !isLazy || isOpen ? props.children : null,
    tabIndex: -1,
    role: "menu",
    id: menuId,
    style: {
      ...props.style,
      transformOrigin: "var(--popper-transform-origin)",
    },
    "aria-orientation": "vertical" as React.AriaAttributes["aria-orientation"],
    onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
  }
}

export function useMenuPositioner(props: any = {}) {
  const { popper, isOpen } = useMenuContext()
  return {
    ...props,
    ref: popper.popperRef,
    style: { visibility: isOpen ? "visible" : "hidden" },
  }
}

export interface UseMenuItemProps
  extends Omit<React.HTMLAttributes<Element>, "color"> {
  isDisabled?: boolean
  isFocusable?: boolean
}

export function useMenuItem(
  props: UseMenuItemProps,
  externalRef: React.Ref<any> = null,
) {
  const {
    onMouseEnter: onMouseEnterProp,
    onMouseMove: onMouseMoveProp,
    onMouseLeave: onMouseLeaveProp,
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
    isOpen,
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

  const onMouseEnter = React.useCallback(
    (event) => {
      onMouseEnterProp?.(event)
      if (isDisabled) return

      setFocusedIndex(index)
    },
    [setFocusedIndex, index, isDisabled, onMouseEnterProp],
  )

  const onMouseMove = React.useCallback(
    (event) => {
      onMouseMoveProp?.(event)
      if (document.activeElement !== ref.current) {
        onMouseEnter(event)
      }
    },
    [onMouseEnter, onMouseMoveProp],
  )

  const onMouseLeave = React.useCallback(
    (event) => {
      onMouseLeaveProp?.(event)
      if (isDisabled) return

      setFocusedIndex(-1)
    },
    [setFocusedIndex, isDisabled, onMouseLeaveProp],
  )

  const onClick = React.useCallback(
    (event: React.MouseEvent) => {
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
    if (!isOpen) return
    if (isFocused && !trulyDisabled && ref.current) {
      focus(ref.current)
    } else if (document.activeElement !== menuRef.current) {
      menuRef.current?.focus()
    }
  }, [isFocused, trulyDisabled, menuRef, isOpen])

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
    onChange: onChangeProp,
    ...htmlProps
  } = props

  const isRadio = type === "radio"

  const fallback = isRadio ? "" : []

  const [value, setValue] = useControllableState({
    defaultValue: defaultValue ?? fallback,
    value: valueProp,
    onChange: onChangeProp,
  })

  const onChange = React.useCallback(
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
      onChange(child.props.value)
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
    children: clones,
  }
}

export function useMenuState() {
  const { isOpen, onClose } = useMenuContext()
  return { isOpen, onClose }
}
