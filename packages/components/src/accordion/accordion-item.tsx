import { cx } from "@chakra-ui/utils/cx"
import { chakra, forwardRef, HTMLChakraProps } from "../system"
import {
  AccordionItemContextProvider,
  useAccordionStyles,
} from "./accordion-context"
import { splitAccordionItemProps } from "./accordion-props"
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

    const [itemProps, localProps] = splitAccordionItemProps(props)
    const context = useAccordionItem(itemProps)

    const styles = useAccordionStyles()

    return (
      <AccordionItemContextProvider value={context}>
        <chakra.div
          ref={ref}
          {...localProps}
          className={cx("chakra-accordion__item", className)}
          __css={styles.item}
        >
          {typeof children === "function"
            ? children({
                isExpanded: !!context.isOpen,
                isDisabled: !!context.isDisabled,
              })
            : children}
        </chakra.div>
      </AccordionItemContextProvider>
    )
  },
)

AccordionItem.displayName = "AccordionItem"
