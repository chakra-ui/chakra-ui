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
  isDisabled?: boolean
  /**
   * If `true` and `isDisabled`, the `Tab` will be focusable but not interactive.
   * @default false
   */
  isFocusable?: boolean
}

/**
 * Tabs hook to manage each tab button.
 *
 * A tab can be disabled and focusable, or both,
 * hence the use of `useClickable` to handle this scenario
 */
export function useTab<P extends UseTabProps>(props: P) {
  const { isDisabled, isFocusable, value } = props

  const { setSelectedValue, isManual, id, setFocusedValue, selectedValue } =
    useTabsContext()

  const isSelected = value === selectedValue

  const onClick = () => {
    if (isDisabled) return
    setSelectedValue(value)
  }

  const onFocus = () => {
    setFocusedValue(value)
    const isDisabledButFocusable = isDisabled && isFocusable
    const shouldSelect = !isManual && !isDisabledButFocusable
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
    disabled: isDisabled,
    "data-disabled": dataAttr(isDisabled),
    "aria-selected": isSelected,
    "aria-controls": makeTabPanelId(id, value),
    onFocus: isDisabled ? undefined : onFocus,
  }
}
