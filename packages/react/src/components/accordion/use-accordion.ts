"use client"

import { useControllableState } from "@chakra-ui/hooks"
import { warn } from "@chakra-ui/utils"
import { useId, useRef, useState } from "react"
import { UseAccordionItemProps } from "./use-accordion-item"

/* -------------------------------------------------------------------------------------------------
 * useAccordion - The root react hook that manages all accordion items
 * -----------------------------------------------------------------------------------------------*/

export interface UseAccordionProps {
  /**
   * If `true`, multiple accordion items can be expanded at once.
   *
   * @default false
   */
  multiple?: boolean
  /**
   * If `true`, any expanded accordion item can be collapsed again.
   *
   * @default false
   */
  collapsible?: boolean
  /**
   * The id(s) of the expanded accordion item(s)
   */
  value?: string[]
  /**
   * The initial id(s) of the expanded accordion item(s)
   */
  defaultValue?: string[]
  /**
   * The callback invoked when accordion items are expanded or collapsed.
   */
  onChange?(value: string[]): void
  /**
   * The id of the accordion
   */
  id?: string
}

/**
 * useAccordion hook provides all the state and focus management logic
 * for accordion items.
 *
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
 */
export function useAccordion(props: UseAccordionProps) {
  const {
    onChange,
    defaultValue,
    value: valueProp,
    multiple,
    collapsible,
    id: idProp,
  } = props

  // validate the props and `warn` if used incorrectly
  multipleWarning(props)
  multipleAndcollapsibleWarning(props)

  const reactId = useId()
  const id = `accordion-${idProp ?? reactId}`

  /**
   * This state is used to track the focused accordion
   * button when click on the button, tab on the button, or
   * use the down/up arrow to navigate.
   */
  const [focusedId, setFocusedId] = useState<string | null>(null)

  const rootRef = useRef<HTMLDivElement>(null)

  /**
   * Hook that manages the controlled and un-controlled state
   * for the accordion.
   */
  const [value, setValue] = useControllableState<string[]>({
    value: valueProp,
    defaultValue() {
      return defaultValue ?? []
    },
    onChange,
  })

  /**
   * Gets the `open` and `onChange` props for a child accordion item based on
   * the child's index.
   *
   * @param itemValue {string} The value of the child accordion item
   */
  const getItemState = (itemValue: string | null) => {
    let open = false

    if (itemValue) {
      open = value.includes(itemValue)
    }

    const onChange = (open: boolean) => {
      if (itemValue === null) return

      if (multiple) {
        //
        const nextState = open
          ? value.concat(itemValue)
          : value.filter((i) => i !== itemValue)

        setValue(nextState)
      } else if (open) {
        setValue([itemValue])
      } else if (collapsible) {
        setValue([])
      }
    }

    return { open, onChange }
  }

  return {
    value,
    setValue,
    getItemState,
    focusedId,
    setFocusedId,
    rootRef,
    id,
  }
}

export type UseAccordionReturn = ReturnType<typeof useAccordion>

/* -------------------------------------------------------------------------------------------------
 * Validate accordion and accordion item props, and emit warnings.
 * -----------------------------------------------------------------------------------------------*/

function multipleWarning(props: UseAccordionProps) {
  const value = props.value || props.defaultValue
  const condition = value != null && !Array.isArray(value) && props.multiple

  warn({
    condition: !!condition,
    message: `If 'allowMultiple' is passed, then 'index' or 'defaultIndex' must be an array. You passed: ${typeof value},`,
  })
}

function multipleAndcollapsibleWarning(props: UseAccordionProps) {
  warn({
    condition: !!(props.multiple && props.collapsible),
    message: `If 'multiple' is passed, 'collapsible' will be ignored. Either remove 'collapsible' or 'multiple' depending on whether you want multiple accordions visible or not`,
  })
}

export function focusableNotDisabledWarning(props: UseAccordionItemProps) {
  warn({
    condition: !!(props.focusable && !props.disabled),
    message: `Using only 'focusable', this prop is reserved for situations where you pass 'disabled' but you still want the element to receive focus (A11y). Either remove it or pass 'disabled' as well.
    `,
  })
}

export function warnIfOpenAndDisabled(props: {
  open: boolean
  disabled?: boolean
}) {
  warn({
    condition: props.open && !!props.disabled,
    message: "Cannot open a disabled accordion item",
  })
}
