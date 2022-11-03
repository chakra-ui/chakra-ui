import {
  AccordionPanel as AtlasAccordionPanel,
  AccordionPanelProps as AtlasAccordionButtonProps,
  useAccordionItemContext,
} from "@atlas/react"
import { cx } from "@chakra-ui/shared-utils"
import { chakra, forwardRef } from "@chakra-ui/system"
import { Collapse, CollapseProps } from "@chakra-ui/transition"
import { useAccordionStyles } from "./accordion-context"

export interface AccordionPanelProps extends AtlasAccordionButtonProps {
  /**
   * The properties passed to the underlying `Collapse` component.
   */
  motionProps?: CollapseProps
}

const ChakraAccordionPanel = chakra(AtlasAccordionPanel)

/**
 * Accordion panel that holds the content for each accordion.
 * It shows and hides based on the state login from the `AccordionItem`.
 *
 * It uses the `Collapse` component to animate its height.
 */
export const AccordionPanel = forwardRef<AccordionPanelProps, "div">(
  function AccordionPanel(props, ref) {
    const { className, motionProps, ...rest } = props
    const { isOpen } = useAccordionItemContext()

    // const { reduceMotion } = useAccordionContext()
    // remove `hidden` prop, 'coz we're using height animation
    // const panelProps = getPanelProps(rest, ref)

    const _className = cx("chakra-accordion__panel", className)
    const styles = useAccordionStyles()

    const child = (
      <ChakraAccordionPanel
        ref={ref}
        {...rest}
        __css={styles.panel}
        className={_className}
      />
    )

    // if (!reduceMotion) {
    // delete panelProps.hidden
    // }

    // if (!reduceMotion) {
    return (
      <Collapse in={isOpen} {...motionProps}>
        {child}
      </Collapse>
    )
    // }
  },
)
