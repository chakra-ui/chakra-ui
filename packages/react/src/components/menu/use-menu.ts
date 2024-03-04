import {
  UseDisclosureProps,
  mergeRefs,
  useAnimationState,
  useControllableState,
  useDisclosure,
  useFocusOnHide,
  useOutsideClick,
  useUpdateEffect,
} from "@chakra-ui/hooks"
import {
  LazyMode,
  callAllHandlers,
  dataAttr,
  getValidChildren,
  lazyDisclosure,
} from "@chakra-ui/utils"
import { nextById, prevById, queryAll } from "@zag-js/dom-utils"
import {
  cloneElement,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react"
import { UsePopperProps, usePopper } from "../../popper"
import { useClickable } from "../clickable"
import { getNextItemFromSearch } from "./get-next-item-from-search"
import { useMenuContext } from "./menu-context"
import { useShortcut } from "./use-shortcut"

/* -------------------------------------------------------------------------------------------------
 * useMenu hook
 * -----------------------------------------------------------------------------------------------*/

export interface UseMenuProps
  extends Omit<UsePopperProps, "enabled">,
    UseDisclosureProps {
  /**
   * The `ref` of the element that should receive focus when the popover opens.
   */
  initialFocusRef?: React.RefObject<{ focus(): void }>
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
   *
   * @default false
   */
  isLazy?: boolean
  /**
   * Performance 🚀:
   * The lazy behavior of menu's content when not visible.
   * Only works when `isLazy={true}`
   *
   * - "unmount": The menu's content is always unmounted when not open.
   * - "keepMounted": The menu's content initially unmounted,
   * but stays mounted when menu is open.
   *
   * @default "unmount"
   */
  lazyBehavior?: LazyMode
  /**
   * If `rtl`, proper placement positions will be flipped i.e. 'top-right' will
   * become 'top-left' and vice-verse
   */
  direction?: "ltr" | "rtl"
  /*
   * If `true`, the menu will be positioned when it mounts
   * (even if it's not open).
   *
   * Note 🚨: We don't recommend using this in a menu/popover intensive UI or page
   * as it might affect scrolling performance.
   *
   * @default false
   */
  computePositionOnMount?: boolean
}

function useIds(idProp?: string, ...prefixes: string[]) {
  const reactId = useId()
  const id = idProp || reactId
  return useMemo(() => {
    return prefixes.map((prefix) => `${prefix}-${id}`)
  }, [id, prefixes])
}

function getOwnerDocument(node?: Element | null): Document {
  return node?.ownerDocument ?? document
}

function isActiveElement(element: HTMLElement) {
  const doc = getOwnerDocument(element)
  return doc.activeElement === (element as HTMLElement)
}

/**
 * React Hook to manage a menu
 *
 * It provides the logic and will be used with react context
 * to propagate its return value to all children
 */
export function useMenu(props: UseMenuProps = {}) {
  const {
    id,
    closeOnSelect = true,
    closeOnBlur = true,
    initialFocusRef,
    autoSelect = true,
    isLazy,
    isOpen: isOpenProp,
    defaultIsOpen,
    onClose: onCloseProp,
    onOpen: onOpenProp,
    placement = "bottom-start",
    lazyBehavior = "unmount",
    direction,
    computePositionOnMount = false,
    ...popperProps
  } = props
  /**
   * Prepare the reference to the menu and disclosure
   */
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const focusMenu = useCallback(() => {
    requestAnimationFrame(() => {
      menuRef.current?.focus({ preventScroll: false })
    })
  }, [])

  const focusFirstItem = useCallback(() => {
    const id = setTimeout(() => {
      if (initialFocusRef) {
        initialFocusRef.current?.focus()
      } else {
        const first = menuRef.current?.querySelector(
          '[role="menuitem"]:first-of-type:not([disabled])',
        )
        if (first) setFocusedId(first.getAttribute("id"))
      }
    })
    timeoutIds.current.add(id)
  }, [initialFocusRef])

  const focusLastItem = useCallback(() => {
    const id = setTimeout(() => {
      const last = menuRef.current?.querySelector<HTMLElement>(
        '[role="menuitem"]:last-of-type:not([disabled])',
      )
      if (last) setFocusedId(last.getAttribute("id"))
    })
    timeoutIds.current.add(id)
  }, [])

  const onOpenInternal = useCallback(() => {
    onOpenProp?.()
    if (autoSelect) {
      focusFirstItem()
    } else {
      focusMenu()
    }
  }, [autoSelect, focusFirstItem, focusMenu, onOpenProp])

  const { isOpen, onOpen, onClose, onToggle } = useDisclosure({
    isOpen: isOpenProp,
    defaultIsOpen,
    onClose: onCloseProp,
    onOpen: onOpenInternal,
  })

  useOutsideClick({
    enabled: isOpen && closeOnBlur,
    ref: menuRef,
    handler: (event) => {
      if (!buttonRef.current?.contains(event.target as HTMLElement)) {
        onClose()
      }
    },
  })

  /**
   * Add some popper.js for dynamic positioning
   */
  const popper: any = usePopper({
    ...popperProps,
    enabled: isOpen || computePositionOnMount,
    placement,
    direction,
  })

  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [focusedId, setFocusedId] = useState<string | null>(null)

  /**
   * Focus the button when we close the menu
   */
  useUpdateEffect(() => {
    if (!isOpen) {
      setFocusedIndex(-1)
      setFocusedId(null)
    }
  }, [isOpen])

  useFocusOnHide(menuRef, {
    focusRef: buttonRef,
    visible: isOpen,
    shouldFocus: true,
  })

  const animationState = useAnimationState({ isOpen, ref: menuRef })

  /**
   * Generate unique ids for menu's list and button
   */
  const [buttonId, menuId] = useIds(id, `menu-button`, `menu-list`)

  const openAndFocusMenu = useCallback(() => {
    onOpen()
    focusMenu()
  }, [onOpen, focusMenu])

  const timeoutIds = useRef<Set<any>>(new Set([]))

  // clean up timeouts
  useEffect(() => {
    const ids = timeoutIds.current
    return () => {
      ids.forEach((id) => clearTimeout(id))
      ids.clear()
    }
  }, [])

  const openAndFocusFirstItem = useCallback(() => {
    onOpen()
    focusFirstItem()
  }, [focusFirstItem, onOpen])

  const openAndFocusLastItem = useCallback(() => {
    onOpen()
    focusLastItem()
  }, [onOpen, focusLastItem])

  const refocus = useCallback(() => {
    const doc = getOwnerDocument(menuRef.current)
    const hasFocusWithin = menuRef.current?.contains(doc.activeElement)
    const shouldRefocus = isOpen && !hasFocusWithin

    if (!shouldRefocus) return

    const node = menuRef.current?.querySelector<HTMLElement>(
      `[role=menuitem][id="${focusedId}"]`,
    )
    node?.focus({ preventScroll: true })
  }, [isOpen, focusedId])

  /**
   * Track the animation frame which is scheduled to focus
   * a menu item, so it can be cancelled if another item
   * is focused before the animation executes. This prevents
   * infinite rerenders.
   */
  const rafId = useRef<number | null>(null)

  return {
    openAndFocusMenu,
    openAndFocusFirstItem,
    openAndFocusLastItem,
    onTransitionEnd: refocus,
    unstable__animationState: animationState,
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
    focusedId,
    closeOnSelect,
    closeOnBlur,
    autoSelect,
    setFocusedIndex,
    setFocusedId,
    isLazy,
    lazyBehavior,
    initialFocusRef,
    rafId,
  }
}

export interface UseMenuReturn extends ReturnType<typeof useMenu> {}

export interface UseMenuTriggerProps
  extends Omit<React.HTMLAttributes<Element>, "color"> {}

export function useMenuTrigger(
  props: UseMenuTriggerProps = {},
  externalRef: React.Ref<any> = null,
) {
  const menu = useMenuContext()

  const { onToggle, popper, openAndFocusFirstItem, openAndFocusLastItem } = menu

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const eventKey = event.key
      const keyMap: Record<string, React.KeyboardEventHandler> = {
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

  return {
    ...props,
    ref: mergeRefs(menu.buttonRef, externalRef, popper.referenceRef),
    id: menu.buttonId,
    "data-active": dataAttr(menu.isOpen),
    "aria-expanded": menu.isOpen,
    "aria-haspopup": "menu" as React.AriaAttributes["aria-haspopup"],
    "aria-controls": menu.menuId,
    onClick: callAllHandlers(props.onClick, onToggle),
    onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
  }
}

function isTargetMenuItem(target: EventTarget | null) {
  // this will catch `menuitem`, `menuitemradio`, `menuitemcheckbox`
  return (
    isHTMLElement(target) &&
    !!target?.getAttribute("role")?.startsWith("menuitem")
  )
}

function queryAllMenuItems(root: HTMLElement | null) {
  return queryAll(root, `[role='menuitem']:not([disabled])`)
}

/* -------------------------------------------------------------------------------------------------
 * useMenuContent
 * -----------------------------------------------------------------------------------------------*/

export interface UseMenuContentProps
  extends Omit<React.HTMLAttributes<Element>, "color"> {}

export function useMenuContent(
  props: UseMenuContentProps = {},
  ref: React.Ref<any> = null,
): React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement> {
  const menu = useMenuContext()

  if (!menu) {
    throw new Error(
      `useMenuContext: context is undefined. Seems you forgot to wrap component within <Menu>`,
    )
  }

  const {
    focusedId,
    setFocusedId,
    menuRef,
    isOpen,
    onClose,
    menuId,
    isLazy,
    lazyBehavior,
    unstable__animationState: animated,
  } = menu

  /**
   * Hook that creates a keydown event handler that listens
   * to printable keyboard character press
   */
  const createTypeaheadHandler = useShortcut({
    preventDefault: (event) =>
      event.key !== " " && isTargetMenuItem(event.target),
  })

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      // ignore events bubbles from portal children
      if (!event.currentTarget.contains(event.target as Element)) return

      const eventKey = event.key

      const keyMap: Record<string, React.KeyboardEventHandler> = {
        Tab: (event) => event.preventDefault(),
        Escape: onClose,
        ArrowDown: () => {
          const next = nextById(
            queryAllMenuItems(menuRef.current),
            focusedId ?? "",
            true,
          )
          if (next) setFocusedId(next.getAttribute("id"))
        },
        ArrowUp: () => {
          const prev = prevById(
            queryAllMenuItems(menuRef.current),
            focusedId ?? "",
            true,
          )
          if (prev) setFocusedId(prev.getAttribute("id"))
        },
      }

      const fn = keyMap[eventKey]

      if (fn) {
        event.preventDefault()
        fn(event)
        return
      }

      /**
       * Typeahead: Based on current character pressed,
       * find the next item to be selected
       */
      const onTypeahead = createTypeaheadHandler((character) => {
        const nextItem = getNextItemFromSearch(
          queryAllMenuItems(menuRef.current),
          character,
          (item) => item?.textContent ?? "",
          menuRef.current?.querySelector(`[role="menuitem"][id=${focusedId}]`),
        )
        if (nextItem) {
          setFocusedId(nextItem.getAttribute("id"))
        }
      })

      if (isTargetMenuItem(event.target)) {
        onTypeahead(event)
      }
    },
    [menuRef, focusedId, createTypeaheadHandler, onClose, setFocusedId],
  )

  const hasBeenOpened = useRef(false)
  if (isOpen) {
    hasBeenOpened.current = true
  }

  const shouldRenderChildren = lazyDisclosure({
    wasSelected: hasBeenOpened.current,
    enabled: isLazy,
    mode: lazyBehavior,
    isSelected: animated.present,
  })

  return {
    ...props,
    ref: mergeRefs(menuRef, ref),
    children: shouldRenderChildren ? props.children : null,
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

/* -------------------------------------------------------------------------------------------------
 * useMenuPosition: Composes usePopper to position the menu
 * -----------------------------------------------------------------------------------------------*/

export function useMenuPositioner(props: any = {}, ref: React.Ref<any> = null) {
  const { popper, isOpen } = useMenuContext()
  return popper.getPopperProps(
    {
      ...props,
      style: {
        visibility: isOpen ? "visible" : "hidden",
        ...props.style,
      },
    },
    ref,
  )
}

/* -------------------------------------------------------------------------------------------------
 * useMenuItem: Hook for each menu item within the menu list.
   We also use it in `useMenuItemOption`
 * -----------------------------------------------------------------------------------------------*/

export interface UseMenuItemProps
  extends Omit<React.HTMLAttributes<Element>, "color" | "disabled"> {
  /**
   * If `true`, the menuitem will be disabled
   */
  isDisabled?: boolean
  /**
   * If `true` and the menuitem is disabled, it'll
   * remain keyboard-focusable
   */
  isFocusable?: boolean
  /**
   * Overrides the parent menu's `closeOnSelect` prop.
   */
  closeOnSelect?: boolean
  /**
   * The type of the menuitem.
   */
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"]
}

export function useMenuItem(
  props: UseMenuItemProps = {},
  externalRef: React.Ref<any> = null,
) {
  const {
    onMouseEnter: onMouseEnterProp,
    onMouseMove: onMouseMoveProp,
    onMouseLeave: onMouseLeaveProp,
    onClick: onClickProp,
    onFocus: onFocusProp,
    isDisabled,
    isFocusable,
    closeOnSelect,
    type: typeProp,
    id: idProp,
    ...htmlProps
  } = props

  const menu = useMenuContext()

  const {
    focusedId,
    setFocusedId,
    closeOnSelect: menuCloseOnSelect,
    onClose,
    menuRef,
    isOpen,
    menuId,
    rafId,
  } = menu

  const ref = useRef<HTMLDivElement>(null)

  const reactId = `${menuId}-menuitem-${useId()}`
  const id = idProp ?? reactId

  const onMouseEnter = useCallback(
    (event: any) => {
      onMouseEnterProp?.(event)
      if (isDisabled) return
      setFocusedId(id)
    },
    [setFocusedId, id, isDisabled, onMouseEnterProp],
  )

  const onMouseMove = useCallback(
    (event: any) => {
      onMouseMoveProp?.(event)
      if (ref.current && !isActiveElement(ref.current)) {
        onMouseEnter(event)
      }
    },
    [onMouseEnter, onMouseMoveProp],
  )

  const onMouseLeave = useCallback(
    (event: any) => {
      onMouseLeaveProp?.(event)
      if (isDisabled) return
      setFocusedId(null)
    },
    [setFocusedId, isDisabled, onMouseLeaveProp],
  )

  const onClick = useCallback(
    (event: React.MouseEvent) => {
      onClickProp?.(event)
      if (!isTargetMenuItem(event.currentTarget)) return
      /**
       * Close menu and parent menus, allowing the MenuItem
       * to override its parent menu's `closeOnSelect` prop.
       */
      if (closeOnSelect ?? menuCloseOnSelect) {
        onClose()
      }
    },
    [onClose, onClickProp, menuCloseOnSelect, closeOnSelect],
  )

  const onFocus = useCallback(
    (event: React.FocusEvent) => {
      onFocusProp?.(event)
      setFocusedId(id)
    },
    [setFocusedId, onFocusProp, id],
  )

  const isFocused = id === focusedId

  const trulyDisabled = isDisabled && !isFocusable

  useUpdateEffect(() => {
    if (!isOpen) return
    if (isFocused && !trulyDisabled && ref.current) {
      // Cancel any pending animations
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
      rafId.current = requestAnimationFrame(() => {
        ref.current?.focus({ preventScroll: true })
        rafId.current = null
      })
    } else if (menuRef.current && !isActiveElement(menuRef.current)) {
      menuRef.current.focus({ preventScroll: true })
    }

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [isFocused, trulyDisabled, menuRef, isOpen])

  const clickableProps = useClickable({
    onClick,
    onFocus,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    ref: mergeRefs(ref, externalRef),
    isDisabled,
    isFocusable,
  })

  return {
    ...htmlProps,
    ...clickableProps,
    type: typeProp ?? (clickableProps as any).type,
    id,
    role: "menuitem",
    tabIndex: isFocused ? 0 : -1,
  }
}

/* -------------------------------------------------------------------------------------------------
 * useMenuOption: Composes useMenuItem to provide a selectable/checkable menu item
 * -----------------------------------------------------------------------------------------------*/

export interface UseMenuOptionOptions {
  value?: string
  isChecked?: boolean
  type?: "radio" | "checkbox"
  children?: React.ReactNode
}

export interface UseMenuOptionProps
  extends Omit<UseMenuItemProps, "type">,
    UseMenuOptionOptions {}

export function useMenuOption(
  props: UseMenuOptionProps = {},
  ref: React.Ref<any> = null,
) {
  const { type = "radio", isChecked, ...rest } = props
  const ownProps = useMenuItem(rest, ref)
  return {
    ...ownProps,
    role: `menuitem${type}`,
    "aria-checked": isChecked as React.AriaAttributes["aria-checked"],
  }
}

/* -------------------------------------------------------------------------------------------------
 * useMenuOptionGroup: Manages the state of multiple selectable menuitem or menu option
 * -----------------------------------------------------------------------------------------------*/

export interface UseMenuOptionGroupProps {
  value?: string | string[]
  defaultValue?: string | string[]
  type?: "radio" | "checkbox"
  onChange?: (value: string | string[]) => void
  children?: React.ReactNode
}

export function useMenuOptionGroup(props: UseMenuOptionGroupProps = {}) {
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

  const onChange = useCallback(
    (selectedValue: string) => {
      if (type === "radio" && typeof value === "string") {
        setValue(selectedValue)
      }

      if (type === "checkbox" && Array.isArray(value)) {
        const nextValue = value.includes(selectedValue)
          ? value.filter((item) => item !== selectedValue)
          : value.concat(selectedValue)

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

function isHTMLElement(el: any): el is HTMLElement {
  if (!isElement(el)) return false
  const win = el.ownerDocument.defaultView ?? window
  return el instanceof win.HTMLElement
}

function isElement(el: any): el is Element {
  return (
    el != null &&
    typeof el == "object" &&
    "nodeType" in el &&
    el.nodeType === Node.ELEMENT_NODE
  )
}
