import { mergeRefs } from "@chakra-ui/hooks/use-merge-refs"
import { callAllHandlers } from "@chakra-ui/utils/call-all"
import { UseClickableProps, useClickable } from "../clickable"
import { useTabsContext, useTabsDescendant } from "./tabs-context"
import { makeTabId, makeTabPanelId } from "./use-tabs"

export interface UseTabOptions {
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

export interface UseTabProps
  extends Omit<UseClickableProps, "color">,
    UseTabOptions {}

export function useTab<P extends UseTabProps>(props: P) {
  const { isDisabled = false, isFocusable = false, ...htmlProps } = props

  const { setSelectedIndex, isManual, id, setFocusedIndex, selectedIndex } =
    useTabsContext()

  const { index, register } = useTabsDescendant({
    disabled: isDisabled && !isFocusable,
  })

  const isSelected = index === selectedIndex

  const onClick = () => {
    setSelectedIndex(index)
  }

  const onFocus = () => {
    setFocusedIndex(index)
    const isDisabledButFocusable = isDisabled && isFocusable
    const shouldSelect = !isManual && !isDisabledButFocusable
    if (shouldSelect) {
      setSelectedIndex(index)
    }
  }

  const clickableProps = useClickable({
    ...htmlProps,
    ref: mergeRefs(register, props.ref),
    isDisabled,
    isFocusable,
    onClick: callAllHandlers(props.onClick, onClick),
  })

  const type: "button" | "submit" | "reset" = "button"

  return {
    ...clickableProps,
    id: makeTabId(id, index),
    role: "tab",
    tabIndex: isSelected ? 0 : -1,
    type,
    "aria-selected": isSelected,
    "aria-controls": makeTabPanelId(id, index),
    onFocus: isDisabled ? undefined : callAllHandlers(props.onFocus, onFocus),
  }
}
