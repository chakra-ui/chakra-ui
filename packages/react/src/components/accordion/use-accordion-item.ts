import { mergeRefs } from "@chakra-ui/hooks"
import { callAllHandlers, dataAttr } from "@chakra-ui/utils"
import { nextById, prevById, queryAll } from "@zag-js/dom-utils"
import { useCallback, useId, useRef } from "react"
import { PropGetterFn } from "../../styled-system/factory.types"
import { useAccordionContext } from "./accordion-context"
import {
  focusableNotDisabledWarning,
  warnIfOpenAndDisabled,
} from "./use-accordion"

/* -------------------------------------------------------------------------------------------------
 * Hook for a single accordion item
 * -----------------------------------------------------------------------------------------------*/

export interface UseAccordionItemProps {
  /**
   * If `true`, the accordion item will be disabled.
   *
   * @default false
   */
  isDisabled?: boolean
  /**
   * If `true`, the accordion item will be focusable.
   *
   * @default false
   */
  isFocusable?: boolean
  /**
   * The unique id of the accordion item.
   */
  id?: string
  /**
   * Unique value the accordion item.
   */
  value?: string
}
function getAllItems(root: HTMLElement | null) {
  return queryAll(root, "[aria-controls]:not([disabled])")
}
function makeId(type: string, id: string, value: string) {
  return `accordion-${type}-${id}-${value.trim().replace(/\s+/g, "-")}`
}
/**
 * useAccordionItem
 *
 * React hook that provides the open/close functionality
 * for an accordion item and its children
 */

export function useAccordionItem(props: UseAccordionItemProps) {
  const { isDisabled, isFocusable, value } = props
  const api = useAccordionContext()

  /**
   * Generate unique ids for all accordion item components (button and panel)
   */
  const reactId = useId()
  const uid = value || reactId

  const buttonRef = useRef<HTMLElement>(null)

  const buttonId = makeId("button", api.id, uid)
  const panelId = makeId("panel", api.id, uid)

  focusableNotDisabledWarning(props)

  const { isOpen, onChange } = api.getItemState(uid)

  warnIfOpenAndDisabled({ isOpen, isDisabled })

  const onOpen = () => {
    onChange?.(true)
  }

  const onClose = () => {
    onChange?.(false)
  }

  /**
   * Toggle the visibility of the accordion item
   */
  const onClick = useCallback(() => {
    onChange?.(!isOpen)
    api.setFocusedId(buttonId)
  }, [onChange, isOpen, api, buttonId])

  /**
   * Manage keyboard navigation between accordion items.
   */
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const rootEl = api.rootRef.current
      const keyMap: Record<string, React.KeyboardEventHandler> = {
        ArrowDown: () => {
          const next = nextById(getAllItems(rootEl), buttonId, true)
          next?.focus()
        },
        ArrowUp: () => {
          const prev = prevById(getAllItems(rootEl), buttonId, true)
          prev?.focus()
        },
        Home: () => {
          const first = getAllItems(rootEl)[0]
          first?.focus()
        },
        End: () => {
          const all = getAllItems(rootEl)
          const last = all[all.length - 1]
          last?.focus()
        },
      }

      const action = keyMap[event.key]

      if (action) {
        event.preventDefault()
        action(event)
      }
    },
    [buttonId, api.rootRef],
  )

  /**
   * Since each accordion item's button still remains tabbable, let's
   * update the focusedValue when it receives focus
   */
  const onFocus = useCallback(() => {
    api.setFocusedId(buttonId)
  }, [api, buttonId])

  const getTriggerProps: PropGetterFn<"button"> = useCallback(
    (props = {}, ref = null) => {
      return {
        ...props,
        type: "button",
        ref: mergeRefs(buttonRef, ref),
        id: buttonId,
        disabled: !!isDisabled,
        "data-expanded": dataAttr(isOpen),
        "aria-expanded": !!isOpen,
        "aria-controls": panelId,
        onClick: callAllHandlers(props.onClick, onClick),
        onFocus: callAllHandlers(props.onFocus, onFocus),
        onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
      }
    },
    [buttonId, isDisabled, isOpen, onClick, onFocus, onKeyDown, panelId],
  )

  const getItemProps: PropGetterFn<"div"> = useCallback(
    (props = {}, ref = null) => {
      return {
        ...props,
        ref,
        "data-expanded": dataAttr(isOpen),
        "data-disabled": dataAttr(isDisabled),
      }
    },
    [isOpen, isDisabled],
  )

  const getContentProps: PropGetterFn<"div"> = useCallback(
    (props = {}, ref = null) => {
      return {
        ...props,
        ref,
        role: "region",
        id: panelId,
        "aria-labelledby": buttonId,
        "data-expanded": dataAttr(isOpen),
        hidden: !isOpen,
      }
    },
    [buttonId, isOpen, panelId],
  )

  const getIndicatorProps: PropGetterFn<"div"> = useCallback(
    (props = {}, ref = null) => {
      return {
        ...props,
        ref,
        "aria-hidden": true,
        "data-expanded": dataAttr(isOpen),
        "data-disabled": dataAttr(isDisabled),
      }
    },
    [isDisabled, isOpen],
  )

  return {
    isOpen,
    isDisabled,
    isFocusable,
    onOpen,
    onClose,
    getItemProps,
    getIndicatorProps,
    getTriggerProps,
    getContentProps,
  }
}

export type UseAccordionItemReturn = ReturnType<typeof useAccordionItem>
