import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  omitThemingProps,
  ReducedMotionProps,
  ThemingProps,
  useMultiStyleConfig,
  useReducedMotionValue,
} from "@chakra-ui/system"
import { cx } from "@chakra-ui/shared-utils"
import { useMemo } from "react"
import {
  AccordionDescendantsProvider,
  AccordionStylesProvider,
} from "./accordion-context"
import {
  AccordionProvider,
  useAccordion,
  UseAccordionProps,
} from "./use-accordion"

export interface AccordionProps
  extends UseAccordionProps,
    Omit<HTMLChakraProps<"div">, keyof UseAccordionProps>,
    ReducedMotionProps,
    ThemingProps<"Accordion"> {}

/**
 * The wrapper that provides context and focus management
 * for all accordion items.
 *
 * It wraps all accordion items in a `div` for better grouping.
 * @see Docs https://chakra-ui.com/accordion
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
 */
export const Accordion = forwardRef<AccordionProps, "div">(function Accordion(
  { children, reducedMotion, ...props },
  ref,
) {
  const prefersReducedMotion = useReducedMotionValue(reducedMotion)
  const styles = useMultiStyleConfig("Accordion", props)
  const ownProps = omitThemingProps(props)

  const { htmlProps, descendants, ...context } = useAccordion(ownProps)

  const ctx = useMemo(
    () => ({ ...context, reduceMotion: prefersReducedMotion }),
    [context, prefersReducedMotion],
  )

  return (
    <AccordionDescendantsProvider value={descendants}>
      <AccordionProvider value={ctx}>
        <AccordionStylesProvider value={styles}>
          <chakra.div
            ref={ref}
            {...htmlProps}
            className={cx("chakra-accordion", props.className)}
            __css={styles.root}
          >
            {children}
          </chakra.div>
        </AccordionStylesProvider>
      </AccordionProvider>
    </AccordionDescendantsProvider>
  )
})

Accordion.displayName = "Accordion"
