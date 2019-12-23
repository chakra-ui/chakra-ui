/**
 * Here's comes the warnings!
 *
 * We can't assume the user will use the hook correctly, so
 * let's prepare of warnings when they use it wrongly
 */

import { AccordionOptions, AccordionItemOptions } from "./useAccordion";

export function warnForAllowMultipleArray(props: AccordionOptions) {
  const indexPassed = props.index || props.defaultIndex;
  if (
    props.allowMultiple &&
    indexPassed != undefined &&
    !Array.isArray(indexPassed)
  ) {
    throw Error(
      `If 'allowMultiple' is passed, then 'index' or 'defaultIndex' must be an array. You passed: ${typeof indexPassed},`,
    );
  }
}

export function warnForAllowMultipleAndAllowToggle(props: AccordionOptions) {
  if (props.allowMultiple && props.allowToggle) {
    console.warn(
      `If 'allowMultiple' is passed, 'allowToggle' will be ignored. Either remove 'allowToggle' or 'allowMultiple' depending on whether you want multiple accordions visible or not`,
    );
  }
}

export function warnForControlledNoOnChange(props: AccordionOptions) {
  if (
    typeof props.index !== "undefined" &&
    typeof props.onChange === "undefined"
  ) {
    console.error(
      `You passed an 'index' prop without an 'onChange' handler. This will render a read-only accordion element. If want the accordion to expand/collapse, either remove 'index' and use 'defaultIndex', or pass 'onChange'.`,
    );
  }
}

export function warnForFocusableNotDisabled(props: AccordionItemOptions) {
  if (props.isFocusable && !props.isDisabled) {
    console.error(
      `Using only 'isFocusable', this prop is reserved for situations where you pass 'isDisabled' but you still want the element to receive focus (A11y). Either remove it or pass 'isDisabled' as well.
      `,
    );
  }
}

export function warnForControlledSwitching(
  label: string,
  isControlled?: boolean,
  propValue?: any,
) {
  if (isControlled && typeof propValue === "undefined") {
    console.error(
      `${label} is changing from controlled to uncontrolled. ${label} should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled ${label} for the lifetime of the component. Check the 'value' prop being passed in.`,
    );
  }

  if (!isControlled && typeof propValue !== "undefined") {
    console.error(
      `${label} is changing from uncontrolled to controlled. ${label} should not switch from uncontrolled to controlled (or vice versa). Decide between using a controlled or uncontrolled ${label} for the lifetime of the component. Check the 'value' prop being passed in.`,
    );
  }
}
