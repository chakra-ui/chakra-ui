import { cx } from "@chakra-ui/shared-utils"
import { chakra, forwardRef, SystemStyleObject } from "@chakra-ui/system"
import { useAccordionStyles } from "./accordion-context"

import {
  AccordionButton as AtlasAccordionButton,
  AccordionButtonProps as AtlasAccordionButtonProps,
} from "@atlas/react"

export interface AccordionButtonProps extends AtlasAccordionButtonProps {}

const ChakraAccordionButton = chakra(AtlasAccordionButton)

/**
 * AccordionButton is used expands and collapses an accordion item.
 * It must be a child of `AccordionItem`.
 *
 * Note 🚨: Each accordion button must be wrapped in a heading tag,
 * that is appropriate for the information architecture of the page.
 */
export const AccordionButton = forwardRef<AccordionButtonProps, "button">(
  function AccordionButton(props, ref) {
    const styles = useAccordionStyles()
    const buttonStyles: SystemStyleObject = {
      display: "flex",
      alignItems: "center",
      width: "100%",
      outline: 0,
      ...styles.button,
    }

    return (
      <ChakraAccordionButton
        {...props}
        className={cx("chakra-accordion__button", props.className)}
        __css={buttonStyles}
        ref={ref}
      />
    )
  },
)

AccordionButton.displayName = "AccordionButton"
