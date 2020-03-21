import { AccordionHookProps, AccordionItemHookProps } from "./Accordion.hook"
import { isDefined, isArray, isUndefined, warn } from "@chakra-ui/utils"

export function allowMultiple(props: AccordionHookProps) {
  const indexPassed = props.index || props.defaultIndex
  warn({
    condition: Boolean(props.allowMultiple && !isArray(indexPassed)),
    message: `If 'allowMultiple' is passed, then 'index' or 'defaultIndex' must be an array. You passed: ${typeof indexPassed},`,
  })
}

export function allowMultipleAndAllowToggle(props: AccordionHookProps) {
  warn({
    condition: Boolean(props.allowMultiple && props.allowToggle),
    message: `If 'allowMultiple' is passed, 'allowToggle' will be ignored. Either remove 'allowToggle' or 'allowMultiple' depending on whether you want multiple accordions visible or not`,
  })
}

export function controlledAndNoChange(props: AccordionHookProps) {
  warn({
    condition: isDefined(props.index) && isUndefined(props.onChange),
    message: `You passed an 'index' prop without an 'onChange' handler. This will render a read-only accordion element. If want the accordion to expand/collapse, either remove 'index' and use 'defaultIndex', or pass 'onChange'.`,
  })
}

export function focusableNotDisabled(props: AccordionItemHookProps) {
  warn({
    condition: Boolean(props.isFocusable && !props.isDisabled),
    message: `Using only 'isFocusable', this prop is reserved for situations where you pass 'isDisabled' but you still want the element to receive focus (A11y). Either remove it or pass 'isDisabled' as well.
    `,
  })
}

export function controlledSwitching(
  label: string,
  isControlled?: boolean,
  propValue?: any,
) {
  warn({
    condition: Boolean(isControlled && isUndefined(propValue)),
    message: `${label} is changing from controlled to uncontrolled. ${label} should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled ${label} for the lifetime of the component. Check the 'value' prop being passed in.`,
  })

  warn({
    condition: Boolean(!isControlled && isDefined(propValue)),
    message: `${label} is changing from uncontrolled to controlled. ${label} should not switch from uncontrolled to controlled (or vice versa). Decide between using a controlled or uncontrolled ${label} for the lifetime of the component. Check the 'value' prop being passed in.`,
  })
}
