import { chakra, forwardRef, HTMLChakraProps } from "@chakra-ui/system"
import { Collapse, CollapseProps } from "@chakra-ui/transition"
import { cx } from "@chakra-ui/shared-utils"
import {
  useAccordionItemContext,
  useAccordionStyles,
} from "./accordion-context"
import { useAccordionContext } from "./use-accordion"

export interface AccordionPanelProps extends HTMLChakraProps<"div"> {
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
export const AccordionPanel = forwardRef<AccordionPanelProps, "div">(
  function AccordionPanel(props, ref) {
    const { className, motionProps, ...rest } = props

    const { reduceMotion } = useAccordionContext()
    const { getPanelProps, isOpen } = useAccordionItemContext()

    // remove `hidden` prop, 'coz we're using height animation
    const panelProps = getPanelProps(rest, ref)

    const _className = cx("chakra-accordion__panel", className)
    const styles = useAccordionStyles()

    if (!reduceMotion) {
      delete panelProps.hidden
    }

    const child = (
      <chakra.div {...panelProps} __css={styles.panel} className={_className} />
    )

    if (!reduceMotion) {
      return (
        <Collapse in={isOpen} {...motionProps}>
          {child}
        </Collapse>
      )
    }

    return child
  },
)

AccordionPanel.displayName = "AccordionPanel"
