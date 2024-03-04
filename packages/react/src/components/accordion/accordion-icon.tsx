import { cx } from "@chakra-ui/utils"
import { defineStyle } from "../../styled-system"
import { Icon } from "../icon"
import {
  useAccordionContext,
  useAccordionItemContext,
  useAccordionStyles,
} from "./accordion-context"

export type AccordionIconProps = React.ComponentProps<typeof Icon>

/**
 * AccordionIcon that gives a visual cue of the open/close state of the accordion item.
 */
export function AccordionIcon(props: AccordionIconProps) {
  const itemApi = useAccordionItemContext()
  const api = useAccordionContext()

  const styles = useAccordionStyles()

  const iconStyles = defineStyle({
    opacity: itemApi.isDisabled ? 0.4 : 1,
    transform: itemApi.isOpen ? "rotate(-180deg)" : undefined,
    transition: api.reduceMotion ? undefined : "transform 0.2s",
    transformOrigin: "center",
    ...styles.icon,
  })

  return (
    <Icon
      viewBox="0 0 24 24"
      aria-hidden
      className={cx("chakra-accordion__icon", props.className)}
      css={iconStyles}
      {...props}
    >
      <path
        fill="currentColor"
        d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
      />
    </Icon>
  )
}

AccordionIcon.displayName = "AccordionIcon"
