import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  SystemStyleObject,
} from "@chakra-ui/system"
import { cx } from "@chakra-ui/shared-utils"
import { useMemo } from "react"
import { AccordionItemProvider, useAccordionStyles } from "./accordion-context"
import { useAccordionItem, UseAccordionItemProps } from "./use-accordion"

export interface AccordionItemProps
  extends Omit<
      HTMLChakraProps<"div">,
      keyof UseAccordionItemProps | "children"
    >,
    UseAccordionItemProps {
  children?:
    | React.ReactNode
    | ((props: { isExpanded: boolean; isDisabled: boolean }) => React.ReactNode)
}
/**
 * AccordionItem is a single accordion that provides the open-close
 * behavior when the accordion button is clicked.
 *
 * It also provides context for the accordion button and panel.
 */

export const AccordionItem = forwardRef<AccordionItemProps, "div">(
  function AccordionItem(props, ref) {
    const { children, className } = props
    const { htmlProps, ...context } = useAccordionItem(props)

    const styles = useAccordionStyles()
    const containerStyles: SystemStyleObject = {
      ...styles.container,
      overflowAnchor: "none",
    }

    const ctx = useMemo(() => context, [context])

    return (
      <AccordionItemProvider value={ctx}>
        <chakra.div
          ref={ref}
          {...htmlProps}
          className={cx("chakra-accordion__item", className)}
          __css={containerStyles}
        >
          {typeof children === "function"
            ? children({
                isExpanded: !!context.isOpen,
                isDisabled: !!context.isDisabled,
              })
            : children}
        </chakra.div>
      </AccordionItemProvider>
    )
  },
)

AccordionItem.displayName = "AccordionItem"
