import { MaybeRenderProp } from "@chakra-ui/react-utils"
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  SystemStyleObject,
} from "@chakra-ui/system"
import { cx, Omit, runIfFn, __DEV__ } from "@chakra-ui/utils"
import { useMemo } from "react"
import {
  AccordionItemProvider,
  useAccordionItemContext,
  useAccordionStyles,
} from "./accordion-context"
import { useAccordionItem, UseAccordionItemProps } from "./use-accordion"

export interface AccordionItemProps
  extends Omit<
      HTMLChakraProps<"div">,
      keyof UseAccordionItemProps | "children"
    >,
    UseAccordionItemProps {
  children?: MaybeRenderProp<{
    isExpanded: boolean
    isDisabled: boolean
  }>
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
          {runIfFn(children, {
            isExpanded: !!context.isOpen,
            isDisabled: !!context.isDisabled,
          })}
        </chakra.div>
      </AccordionItemProvider>
    )
  },
)
if (__DEV__) {
  AccordionItem.displayName = "AccordionItem"
}

/**
 * React hook to get the state and actions of an accordion item
 */
export function useAccordionItemState() {
  const { isOpen, isDisabled, onClose, onOpen } = useAccordionItemContext()
  return { isOpen, onClose, isDisabled, onOpen }
}
