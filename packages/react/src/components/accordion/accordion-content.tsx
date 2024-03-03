import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { Collapse, CollapseProps } from "../transition"
import {
  useAccordionContext,
  useAccordionItemContext,
  useAccordionStyles,
} from "./accordion-context"

export interface AccordionContentProps extends HTMLChakraProps<"div"> {
  /**
   * The properties passed to the underlying `Collapse` component.
   */
  motionProps?: CollapseProps
}

/**
 * Accordion panel that holds the content for each accordion.
 * It shows and hides based on the state login from the `AccordionItem`.
 *
 * It uses the `Collapse` component to animate its height.
 */
export const AccordionContent = forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(function AccordionContent(props, ref) {
  const { className, motionProps, ...restProps } = props

  const rootApi = useAccordionContext()
  const api = useAccordionItemContext()

  const styles = useAccordionStyles()

  const contentProps = api.getContentProps(restProps, ref)

  // remove `hidden` prop, 'coz we're using height animation
  if (!rootApi.reduceMotion) {
    delete contentProps.hidden
  }

  const child = (
    <chakra.div
      {...contentProps}
      css={styles.content}
      className={cx("chakra-accordion__panel", className)}
    />
  )

  if (!rootApi.reduceMotion) {
    return (
      <Collapse in={api.isOpen} {...motionProps}>
        {child}
      </Collapse>
    )
  }

  return child
})

AccordionContent.displayName = "AccordionContent"
