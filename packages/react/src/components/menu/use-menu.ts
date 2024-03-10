import {
  UseDisclosureProps,
  mergeRefs,
  useDisclosure,
  useFocusOnHide,
  useOutsideClick,
  useUpdateEffect,
} from "@chakra-ui/hooks"
import { callAllHandlers, dataAttr, isHTMLElement } from "@chakra-ui/utils"
import {
  getEventTarget,
  isSelfEvent,
  nextById,
  prevById,
  queryAll,
  raf,
} from "@zag-js/dom-utils"
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react"
import { UsePopperProps, usePopper } from "../../popper"
import { PropGetterFn } from "../../styled-system/factory.types"
import { getNextItemFromSearch } from "./get-next-item-from-search"
import { useMenuContext } from "./menu-context"
import { splitMenuItemProps } from "./menu-props"
import { useShortcut } from "./use-shortcut"

export interface UseMenuOptionItemProps extends UseMenuItemProps {
  value?: string
  isChecked?: boolean
  type?: "radio" | "checkbox"
}

export interface UseMenuItemProps {
  /**
   * The id of the menuitem
   */
  id?: string
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
}

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

export function isActiveElement(element: HTMLElement) {
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
    isOpen: isOpenProp,
    defaultIsOpen,
    onClose: onCloseProp,
    onOpen: onOpenProp,
    placement = "bottom-start",
    direction,
    computePositionOnMount = false,
    ...popperProps
  } = props

  const contentRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const focusContent = useCallback(() => {
    requestAnimationFrame(() => {
      contentRef.current?.focus({ preventScroll: false })
    })
  }, [])

  const focusFirstItem = useCallback(() => {
    const id = setTimeout(() => {
      if (initialFocusRef) {
        initialFocusRef.current?.focus()
      } else {
        const first = contentRef.current?.querySelector(
          '[role="menuitem"]:first-of-type:not([disabled])',
        )
        if (first) setFocusedId(first.getAttribute("id"))
      }
    })

    timeoutIds.current.add(id)
  }, [initialFocusRef])

  const focusLastItem = useCallback(() => {
    const id = setTimeout(() => {
      const last = contentRef.current?.querySelector<HTMLElement>(
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
      focusContent()
    }
  }, [autoSelect, focusFirstItem, focusContent, onOpenProp])

  const { isOpen, onOpen, onClose, onToggle } = useDisclosure({
    isOpen: isOpenProp,
    defaultIsOpen,
    onClose: onCloseProp,
    onOpen: onOpenInternal,
  })

  useOutsideClick({
    enabled: isOpen && closeOnBlur,
    ref: contentRef,
    handler: (event) => {
      const target = getEventTarget(event)
      if (!triggerRef.current?.contains(target as HTMLElement)) {
        onClose()
      }
    },
  })

  const popper = usePopper({
    ...popperProps,
    enabled: isOpen || computePositionOnMount,
    placement,
  })

  const [focusedId, setFocusedId] = useState<string | null>(null)

  /**
   * Focus the button when we close the menu
   */
  useUpdateEffect(() => {
    if (!isOpen) {
      setFocusedId(null)
    }
  }, [isOpen])

  useFocusOnHide(contentRef, {
    focusRef: triggerRef,
    visible: isOpen,
    shouldFocus: true,
  })

  useUpdateEffect(() => {
    if (!isOpen) return
    return raf(() => {
      const item = contentRef.current?.querySelector<HTMLElement>(
        `[role^=menuitem][id="${focusedId}"]`,
      )
      item?.focus({ preventScroll: true })
    })
  }, [focusedId, isOpen])

  const [buttonId, menuId] = useIds(id, `menu-button`, `menu-list`)

  const openAndFocusMenu = useCallback(() => {
    onOpen()
    focusContent()
  }, [onOpen, focusContent])

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

  function getMenuItems() {
    return queryAll(
      contentRef.current,
      `[role^=menuitem]:not([aria-disabled=true])`,
    )
  }

  const getTriggerProps: PropGetterFn<"button"> = (props = {}, ref = null) => {
    return {
      ...props,
      ref: mergeRefs(triggerRef, ref, popper.referenceRef),
      id: buttonId,
      "data-active": dataAttr(isOpen),
      "aria-expanded": isOpen,
      "aria-haspopup": "menu",
      "aria-controls": menuId,
      onClick: callAllHandlers(props.onClick, onToggle),
      onKeyDown: callAllHandlers(
        props.onKeyDown,
        (event: React.KeyboardEvent) => {
          const eventKey = event.key
          const keyMap: Record<string, React.KeyboardEventHandler> = {
            Enter: openAndFocusMenu,
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
      ),
    }
  }

  const createTypeaheadHandler = useShortcut({
    preventDefault: (event) =>
      event.key !== " " && isTargetMenuItem(event.target),
  })

  const getContentProps: PropGetterFn<"div"> = (props = {}, ref = null) => {
    return {
      ...props,
      ref: mergeRefs(contentRef, ref),
      tabIndex: -1,
      role: "menu",
      "aria-orientation": "vertical",
      style: {
        ...props.style,
        transformOrigin: "var(--popper-transform-origin)",
      },
      onKeyDown: callAllHandlers(
        props.onKeyDown,
        (event: React.KeyboardEvent) => {
          if (!isSelfEvent(event)) return

          const eventKey = event.key

          const keyMap: Record<string, React.KeyboardEventHandler> = {
            Tab: (event) => event.preventDefault(),
            Escape: onClose,
            ArrowDown: () => {
              const next = nextById(getMenuItems(), focusedId ?? "", true)
              if (next) setFocusedId(next.getAttribute("id"))
            },
            ArrowUp: () => {
              const prev = prevById(getMenuItems(), focusedId ?? "", true)
              if (prev) setFocusedId(prev.getAttribute("id"))
            },
          }

          const fn = keyMap[eventKey]

          if (fn) {
            event.preventDefault()
            fn(event)
            return
          }

          const onTypeahead = createTypeaheadHandler((character) => {
            const nextItem = getNextItemFromSearch(
              getMenuItems(),
              character,
              (item) => item?.textContent ?? "",
              contentRef.current?.querySelector(
                `[role="*menuitem"][id=${focusedId}]`,
              ),
            )
            if (nextItem) {
              setFocusedId(nextItem.getAttribute("id"))
            }
          })

          if (isTargetMenuItem(event.target)) {
            onTypeahead(event)
          }
        },
      ),
    }
  }

  const getPositionerProps: PropGetterFn<"div"> = (props = {}, ref = null) => {
    return popper.getPopperProps(
      {
        ...props,
        style: { ...props.style, visibility: isOpen ? "visible" : "hidden" },
      },
      ref,
    )
  }

  const getItemProps: PropGetterFn<"button", UseMenuItemProps> = (
    props = {},
    ref = null,
  ) => {
    const [itemProps, localProps] = splitMenuItemProps(props)

    const { isDisabled, isFocusable } = itemProps
    const trulyDisabled = isDisabled && !isFocusable

    const id = itemProps.id!
    const isFocused = id === focusedId

    return {
      ...localProps,
      ref,
      type: "button",
      id,
      role: "menuitem",
      tabIndex: isFocused ? 0 : -1,
      "data-focus": dataAttr(isFocused),
      disabled: trulyDisabled,
      "data-disabled": dataAttr(isDisabled),
      onPointerMove: callAllHandlers(props.onPointerMove, () => {
        if (itemProps.isDisabled) return
        setFocusedId(id)
      }),
      onPointerLeave: callAllHandlers(props.onPointerLeave, () => {
        if (isDisabled) return
        setFocusedId(null)
      }),
      onClick: callAllHandlers(props.onClick, () => {
        if (itemProps.closeOnSelect ?? closeOnSelect) {
          onClose()
        }
      }),
      onFocus: callAllHandlers(props.onFocus, () => {
        setFocusedId(id)
      }),
    }
  }

  const getOptionItemProps: PropGetterFn<"button", UseMenuOptionItemProps> = (
    props = {},
    ref = null,
  ) => {
    const { isChecked, type = "radio", value, ...restProps } = props
    return {
      ...getItemProps(restProps, ref),
      role: `menuitem${type}`,
      "aria-checked": isChecked as React.AriaAttributes["aria-checked"],
    }
  }

  return {
    contentRef,
    isOpen,
    onClose,
    onOpen,
    focusedId,
    getTriggerProps,
    getItemProps,
    getOptionItemProps,
    getContentProps,
    getPositionerProps,
    forceUpdate: popper.forceUpdate,
  }
}

export type UseMenuReturn = ReturnType<typeof useMenu>

export function isTargetMenuItem(target: EventTarget | null) {
  return (
    isHTMLElement(target) &&
    !!target?.matches(`[role^=menuitem]:not([aria-disabled=true])`)
  )
}

export function useMenuState() {
  const { isOpen, onClose } = useMenuContext()
  return { isOpen, onClose }
}
