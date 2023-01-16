import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  omitThemingProps,
  ThemingProps,
  useMultiStyleConfig,
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
    ThemingProps<"Accordion"> {
  /**
   * If `true`, height animation and transitions will be disabled.
   *
   * @default false
   */
  reduceMotion?: boolean
}

/**
 * The wrapper that provides context and focus management
 * for all accordion items.
 *
 * It wraps all accordion items in a `div` for better grouping.
 * @see Docs https://chakra-ui.com/accordion
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
 */
export const Accordion = forwardRef<AccordionProps, "div">(function Accordion(
  { children, reduceMotion, ...props },
  ref,
) {
  const styles = useMultiStyleConfig("Accordion", props)
  const ownProps = omitThemingProps(props)

  const { htmlProps, descendants, ...context } = useAccordion(ownProps)

  const ctx = useMemo(
    () => ({ ...context, reduceMotion: !!reduceMotion }),
    [context, reduceMotion],
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
