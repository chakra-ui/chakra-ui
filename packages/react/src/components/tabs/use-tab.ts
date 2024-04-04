"use client"

import { dataAttr } from "@chakra-ui/utils"
import { useTabsContext } from "./tabs-context"
import { makeTabId, makeTabPanelId } from "./use-tabs"

export interface UseTabProps {
  /**
   * The value of the tab
   */
  value: string
  /**
   * If `true`, the `Tab` won't be toggleable
   * @default false
   */
  disabled?: boolean
  /**
   * If `true` and `disabled`, the `Tab` will be focusable but not interactive.
   * @default false
   */
  focusable?: boolean
}

/**
 * Tabs hook to manage each tab button.
 *
 * A tab can be disabled and focusable, or both,
 * hence the use of `useClickable` to handle this scenario
 */
export function useTab<P extends UseTabProps>(props: P) {
  const { disabled, focusable, value } = props

  const {
    setSelectedValue,
    activationMode,
    id,
    setFocusedValue,
    selectedValue,
  } = useTabsContext()

  const isSelected = value === selectedValue
  const isManual = activationMode === "manual"

  const onClick = () => {
    if (disabled) return
    setSelectedValue(value)
  }

  const onFocus = () => {
    setFocusedValue(value)
    const disabledButFocusable = disabled && focusable
    const shouldSelect = !isManual && !disabledButFocusable
    if (shouldSelect) {
      setSelectedValue(value)
    }
  }

  return {
    onClick,
    id: makeTabId(id, value),
    role: "tab",
    tabIndex: isSelected ? 0 : -1,
    type: "button",
    disabled: disabled,
    "data-disabled": dataAttr(disabled),
    "aria-selected": isSelected,
    "aria-controls": makeTabPanelId(id, value),
    onFocus: disabled ? undefined : onFocus,
  }
}
