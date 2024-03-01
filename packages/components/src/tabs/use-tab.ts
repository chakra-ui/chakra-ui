import { callAllHandlers } from "@chakra-ui/utils/call-all"
import { useClickable, UseClickableProps } from "../clickable"
import { useTabsContext } from "./tabs-context"
import { makeTabId, makeTabPanelId } from "./use-tabs"

export interface UseTabOptions {
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
  isFocusable?: boolean
}

export interface UseTabProps
  extends Omit<UseClickableProps, "color">,
    UseTabOptions {}

/**
 * Tabs hook to manage each tab button.
 *
 * A tab can be disabled and focusable, or both,
 * hence the use of `useClickable` to handle this scenario
 */
export function useTab<P extends UseTabProps>(props: P) {
  const { disabled, isFocusable, value, ref, ...htmlProps } = props

  const { setSelectedValue, isManual, id, setFocusedValue, selectedValue } =
    useTabsContext()

  const isSelected = value === selectedValue

  const onClick = () => {
    setSelectedValue(value)
  }

  const onFocus = () => {
    setFocusedValue(value)
    const disabledButFocusable = disabled && isFocusable
    const shouldSelect = !isManual && !disabledButFocusable
    if (shouldSelect) {
      setSelectedValue(value)
    }
  }

  const clickableProps = useClickable({
    ...htmlProps,
    ref,
    disabled,
    isFocusable,
    onClick: callAllHandlers(props.onClick, onClick),
  })

  const type: "button" | "submit" | "reset" = "button"

  return {
    ...clickableProps,
    id: makeTabId(id, value),
    role: "tab",
    tabIndex: isSelected ? 0 : -1,
    type,
    "aria-selected": isSelected,
    "aria-controls": makeTabPanelId(id, value),
    onFocus: disabled ? undefined : callAllHandlers(props.onFocus, onFocus),
  }
}
