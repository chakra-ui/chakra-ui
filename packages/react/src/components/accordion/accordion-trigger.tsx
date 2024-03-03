import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import {
  useAccordionItemContext,
  useAccordionStyles,
} from "./accordion-context"

export interface AccordionTriggerProps extends HTMLChakraProps<"button"> {}

/**
 * Used expands and collapses an accordion item.
 * It must be a child of `AccordionItem`.
 *
 * Note 🚨: Each accordion button must be wrapped in a heading tag,
 * that is appropriate for the information architecture of the page.
 */
export const AccordionTrigger = forwardRef<AccordionTriggerProps, "button">(
  function AccordionTrigger(props, ref) {
    const api = useAccordionItemContext()
    const styles = useAccordionStyles()

    const triggerProps = api.getTriggerProps(props, ref)

    return (
      <chakra.button
        {...triggerProps}
        className={cx("chakra-accordion__trigger", props.className)}
        css={styles.trigger}
      />
    )
  },
)

AccordionTrigger.displayName = "AccordionTrigger"
