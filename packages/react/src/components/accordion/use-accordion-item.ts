"use client"

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
  disabled?: boolean
  /**
   * If `true`, the accordion item will be focusable.
   *
   * @default false
   */
  focusable?: boolean
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
  const { disabled, focusable, value } = props
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

  const { open, onChange } = api.getItemState(uid)

  warnIfOpenAndDisabled({ open, disabled })

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
    onChange?.(!open)
    api.setFocusedId(buttonId)
  }, [onChange, open, api, buttonId])

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
        disabled: !!disabled,
        "data-expanded": dataAttr(open),
        "aria-expanded": !!open,
        "aria-controls": panelId,
        onClick: callAllHandlers(props.onClick, onClick),
        onFocus: callAllHandlers(props.onFocus, onFocus),
        onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
      }
    },
    [buttonId, disabled, open, onClick, onFocus, onKeyDown, panelId],
  )

  const getItemProps: PropGetterFn<"div"> = useCallback(
    (props = {}, ref = null) => {
      return {
        ...props,
        ref,
        "data-expanded": dataAttr(open),
        "data-disabled": dataAttr(disabled),
      }
    },
    [open, disabled],
  )

  const getContentProps: PropGetterFn<"div"> = useCallback(
    (props = {}, ref = null) => {
      return {
        ...props,
        ref,
        role: "region",
        id: panelId,
        "aria-labelledby": buttonId,
        "data-expanded": dataAttr(open),
        hidden: !open,
      }
    },
    [buttonId, open, panelId],
  )

  const getIndicatorProps: PropGetterFn<"div"> = useCallback(
    (props = {}, ref = null) => {
      return {
        ...props,
        ref,
        "aria-hidden": true,
        "data-expanded": dataAttr(open),
        "data-disabled": dataAttr(disabled),
      }
    },
    [disabled, open],
  )

  return {
    open,
    disabled,
    focusable,
    onOpen,
    onClose,
    getItemProps,
    getIndicatorProps,
    getTriggerProps,
    getContentProps,
  }
}

export type UseAccordionItemReturn = ReturnType<typeof useAccordionItem>
